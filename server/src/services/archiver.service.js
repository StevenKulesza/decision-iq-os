import archiver from 'archiver'
import path from 'path'
import fs from 'fs'
import utils from '../lib/utils'

const appDir = path.dirname(require.main.filename)


// ZIP ad files
// uses class to create new instances of same service
export default class FileArchiver {
  constructor(feed, res) {
    this.feed = feed;
    this.res = res;
  }

  download() {
    // new archive instance to zip more than one in a session
    const zip = new archiver('zip');

    // grab feed from instance
    const feed = this.feed;

    // grab response from instance
    const res = this.res;

    // directories to write and read from
    const uploadsDir = path.join(appDir, '/uploads/');
    const templatesDir = path.join(appDir, '/templates/');

    // response feed data
    const feedArray = feed.feed.data;

    // allowed file extensions
    const extensions = [".jpg", ".png", ".svg"];

    // create feed json
    const feedArrayString = JSON.stringify(feedArray);

    // prettify the json
    const feedArrayObject = JSON.parse(feedArrayString);

    // init the image array
    let imageArray = [];

    // grab image names from object
    feedArrayObject.forEach(function(x){iterate(x)});

    // removes duplicate image names so the zip does not pull the same image twice
    imageArray = utils.uniqFast(imageArray);

    // zip images
    for (let i = 0; i < imageArray.length; i++) {
      console.log(imageArray[i])
      const filePath = path.join(uploadsDir, imageArray[i]);
      zip.append(fs.createReadStream(filePath), { name: 'images/'+imageArray[i] });
    }

    // attach the zip file to response
    res.attachment(feed.name + '.zip');
    zip.pipe(res);

    zip.append(feedArrayString, { name: 'feed.json' })
    zip.directory(templatesDir + '/' + feed.templateType, false);

    zip.on('error', (err) => { throw err; });
    zip.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.log('ENOENT for archive')
      } else {
        throw err;
      }
    });

    zip.finalize();

    // send the zip file
    return this;

    // grab all the image names from the json
    // need to refactor to be in ../lib/utils
    function iterate(obj){
      for(var x in obj) {
        if (typeof(obj[x])==='object') {
          iterate(obj[x]);
        }
        else if (obj.hasOwnProperty(x)) {
          extensions.forEach(function(extension) {
            if (typeof(obj[x])==='string' && obj[x].endsWith(extension)) {
              obj[x] = obj[x].replace(/^(.*[\\\/])/, '') // remove everything before last slash, grab image names
              imageArray.push(obj[x]);
            }
          })
        }
      }
    }
  }
}
