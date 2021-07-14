import express from 'express'
import fs from 'fs'
import fsExtra from 'fs-extra'
import request from 'request';
import mkdirp from 'mkdirp';
import shortid from 'shortid';
import archiver from 'archiver';

const exportRoot = 'src/exports/';
const exportFileName = 'flight.zip';
const templatesRoot = 'src/templates/'; 

exports.exportFlight = function(template, props){
    const tempDirectory = shortid.generate();
    let localDirectory = exportRoot + tempDirectory + '/';

    //Export images in given Feed
    let exportImages = () => { return new Promise((resolve, reject) => {
        if(props.includeImages) return resolve(exports.downloadFeedImages(template, localDirectory));
        else return resolve();
    })};

    //Export Richload for given Feed
    let exportRichload = () => { return new Promise((resolve, reject) => {
        if(props.includeRichloads) return resolve(exports.copyRichloadToExport(template, localDirectory));
        else return resolve();
    })};
    
    //Export Feed as JSON
    let exportFeed = () => { return new Promise((resolve, reject) => {
        if(props.includeFeed) return resolve(exports.saveFeedToJSON(template, localDirectory));
        else return resolve();
    })};

    //Zip all the images, feed, and richload
    let zipEverything = () => { return new Promise((resolve, reject) => {
        console.log("Zip Everything");
        let zipOutput = fs.createWriteStream(localDirectory  + exportFileName);
        var archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        zipOutput.on('close', function() {
            //console.log(archive.pointer() + ' total bytes');
            //console.log('archiver has been finalized and the output file descriptor has closed.');

            resolve(localDirectory + exportFileName);
        });
        
        zipOutput.on('end', function() {
            //console.log('Data has been drained');
        });
        
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                reject();
                throw err;
            }
        });
        
        // good practice to catch this error explicitly
        archive.on('error', function(err) {
            reject();
            throw err;
        });
        
        // pipe archive data to the file
        archive.pipe(zipOutput);

        //add pertinent paths to zip
        archive.directory(localDirectory+'images/', 'images'); //images
        archive.directory(localDirectory+'richloads/', 'richloads');//richloads
        archive.file(localDirectory+'feed.json', { name: 'feed.json' });//feed

        //end archive
        archive.finalize();
    })}
    
    //Kick the process off in a promise chain
    return new Promise((resolve, reject) => {
        //make sure directory exists
        mkdirp(localDirectory, (err) => {
            exportImages()
            .then(exportRichload)
            .then(exportFeed)
            .then(zipEverything)
            .then(()=>{resolve('/exports/' + tempDirectory + '/' + exportFileName)});
        });
    });
}

exports.saveFeedToJSON = function(feed, localDirectory){
    return new Promise((resolve, reject) => {
        console.log("Export: Feed");
        let feedJSON = {};
        let filterableKeys = ['label', 'autoSelect', 'size', 'type', 'options'];
        let filteredStateFeed = filterNestObject(feed.template, filterableKeys);

        feedJSON.data = [filteredStateFeed]

        fs.writeFile(localDirectory+'feed.json', JSON.stringify(feedJSON), 'utf8', err => {
            if(err) reject();
            else resolve();
        });
    });

    // TODO: refactor this to utility
    function filterNestObject (item, keysToRemove) {
        if (Object(item) !== item) {
          return item;
        }
      
        if (Array.isArray(item)) {
          return item.map(o => filterNestObject(o, keysToRemove));
        }
      
        return Object.keys(item)
          .filter(key => !keysToRemove.includes(key))
          .reduce((object, key) => {
            return {
              ...object,
              [key]: (Object(item[key]) === item[key]) ? filterNestObject(item[key], keysToRemove) : item[key]
            };
          }, {})
    }
};

exports.copyRichloadToExport = function(feed, localDirectory){
    //TODO: Make this support all sizes
    return new Promise((resolve, reject) => {
        console.log("Export: Richloads");
        const activeTemplate = feed.template.template.toLowerCase();
        
        let promises = [];

        //create richload directories
        Object.keys(feed.sizes).map((sizeKey)=>{
            if(feed.sizes[sizeKey].active){
                let copyPromise = new Promise((resolve, reject)=>{
                    mkdirp(localDirectory+'richloads/'+sizeKey+'/', (err) => {
                        fsExtra.copy(templatesRoot+activeTemplate+'/'+sizeKey+'/richload/', localDirectory+'/richloads/'+sizeKey+'/', function (err) {
                            if (err) {
                              reject(err)
                            } else {
                              resolve();
                              console.log("-- " + sizeKey);
                            }
                        });
                    })
                });
                promises.push(copyPromise);
            }
        });

        Promise.all(promises)
            .then(() => {resolve()})
            .catch(err => {reject(err)});
    });
}

//finds all images in the given feed and downloads them to the given directory
exports.downloadFeedImages = function(feed, localDirectory){
    let images = [];
    let downloadedImage = [];

    return new Promise((resolve, reject) => {
        console.log("Export: Images");
        
        //find all the images in the feed
        findImagesInObject(feed.template);
        console.log("-- found all images in feed");
        console.log('images ', images)
        //create images directory
        mkdirp(localDirectory+'images/', (err) => {
            //download all the images found
            images.map(imageURL => {
                var filename = imageURL.substring(imageURL.lastIndexOf('/')+1).split("?")[0].split("#")[0];
                console.log("--- download file: " + imageURL);
                console.log("--- to file: " + localDirectory+'images/'+filename);
                downloadedImage.push(download(imageURL, localDirectory+'images/'+filename));
            });
            console.log("-- downloading images");
            
             //once all the images are downloaded, return the path
            Promise.all(downloadedImage)
            .then(() => {
                console.log("-- download complete")   ;             
                resolve();
            })
            .catch(() => {
                reject();
            });
        });
    });

    function findImagesInObject(object){
        Object.keys(object).map(key => {
            let element = object[key];
            let type = typeof(element);
            if(type === "object") findImagesInObject(element);
            if(type === "string") {
                if(/(http(s?):).*\.(?:jpg|gif|png)/g.test(element)){
                    images.push(element);
                }
            }
        });
    }

    function download(uri, filename){
        return new Promise((resolve, reject) => {
            request.head(uri, function(err, res, body){
                // console.log('content-type:', res.headers['content-type']);
                // console.log('content-length:', res.headers['content-length']);

                if(err){return reject();}
            
                request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
            });
        });
    };
}



