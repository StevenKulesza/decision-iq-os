import express from 'express'
import mongoose from 'mongoose'
import url from 'url'
import fs from 'fs'
import csv from 'csvtojson';
import formidable from 'formidable';

// services
import FileArchiver from '../services/archiver.service.js'

// models
import Feed from '../models/feed.model'

// controllers
import Blobs from '../controllers/blobs.controller'

// create feed
exports.create_feed = function(data){
  return new Promise(function(resolve, reject){
    Feed.find({name: data.name})
    .exec()
    .then(feeds => {
      console.log(feeds)
      if(feeds.length >= 1){
        reject('feed already exists');
      } else {
        //create a new feed
        const newFeed = new Feed({
          _id: new mongoose.Types.ObjectId(),
          feed: data.feed,
          feedName: data.feedName,
          audienceName: data.audienceName,
          zipTemplate: data.zipTemplates,
          writeManifest: data.writeManifest,
          templateSizes: data.templateSizes,
          templateType: data.templateType
        });

        //save the user to the database
        newFeed
          .save()
          .then(result => {
              console.log('Feed created');
              resolve(newFeed);
          })
          .catch(reject);
      }
    })
    .catch(reject);
  })
}

exports.API_create_feed = function(req, res){
  exports.create_feed(req.body)
    .then(feed => {
      console.log(feed);
      res.status(201).json({
        message: 'Feed created'
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      });
    })
}

// delete a feed
exports.API_delete_feed = function(req, res){
  Feed.remove({'name': req.params.feedName})
    .exec()
    .then(result => {
      if(result.n >= 1){
        res.status(202).json({
            message: 'Feed deleted'
        });
      }else{
        res.status(404).json({
          message: 'Feed not found. No Feed deleted'
        })
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

// get feeds /feeds
exports.API_get_all_feeds = function(req, res) {
  Feed.find({})
  .exec(function(err, dbfeeds){
    if(err){
      res.send('get error has occured in routes/feeds.js');
    } else {
      res.json(dbfeeds);
    }
  });
};

// convert csv to json - /feeds/json/create
exports.API_csvToJson = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    const csvFileType = fields.type
    const csvFilePath = files.csv.path;
    if (!files.csv) return res.status(500).json({
      message: 'Error: no data provided.'
    });

    csv()
      .fromFile(csvFilePath)
      .then((csvJson) => {
        let csvJsonParsed = JSON.parse(JSON.stringify(csvJson));
        let products = [];
        let product = {};

        if (csvFileType === 'product') {
          csvJsonParsed.map(item => {
            //TODO: create item schemas in one place then import into service.
            product = {
              "id": "",
              "division": "",
              "weight": 1,
              "product_id": "",
              "image": {
                "label": "Image",
                "type": "image",
                "value": "",
                "imageID": ""
              },
              "price": "",
              "brand": "",
              "description": "",
              "clicktag": ""
            }

            product.id            = item.id;
            product.division      = item.division;
            product.product_id    = item.product_id;
            product.image.value   = item.image_path;
            product.image.imageID = item.image_name;
            product.price         = item.price;
            product.brand         = item.brand;
            product.description   = item.description;
            product.clicktag      = item.clicktag;

            products.push(product)
          })
          return res.json(products);
        } else {
          return res.json(csvJson);
        }
      })
      .catch((err) => {
        return res.status(404).json({
          'message': 'Could not convert csv. Check path or validity.'
        });
      })
  })

  
};

// get feed - /feeds/{id}
exports.API_get_one_feed = function(req, res) {
  console.log('get one feed')
  console.log(req.params.id)
  Feed.findOne({'feedName': req.params.id})
  .exec(function(err, dbfeeds){
    if(err){
      res.send('get error has occured in routes/feeds.js');
    } else {
      console.log(dbfeeds)
      res.json(dbfeeds);
    }
  });
};

// download one feed file /feeds/{id}/download
exports.API_download_one_feed = function(req, res, next) {
  Feed.findOne({'name': req.params.feedName})
  .exec(function(err, dbfeeds){
    if(err){
      res.send('get error has occured in routes/feeds.js');
    } else {

      // grab feed to download and zip with archiver service
      const archiver = new FileArchiver(dbfeeds, res).download();
      return archiver;
    }
  })
};

//TODO: this was an attempt to fix the inability to access the static zip file(s)
exports.API_get_export = function(req, res, next){
  fs.readFile('src/exports/r9lHB1E8A/flight.zip', function(err, data) {
      if (err) {
          res.writeHead(404);
          return res.end("File not found.");
      }
      
      res.setHeader("Content-Type",'application/zip'); //Solution!
      res.writeHead(200);
      res.end(data);
  });
};

// get feed audience - /feeds/{id}/{audienceId}
exports.API_get_one_feed_audience = function(req, res) {
  console.log('get feed audience')
  console.log(req.params)
  Feed.findOne({
    'feedName': req.params.id,
    'audienceName': req.params.audienceId
  })
  .exec(function(err, dbfeeds){
    if(err){
      res.send('get error has occured in routes/feeds.js');
    } else {
      console.log(dbfeeds)
      res.json(dbfeeds);
    }
  });
};

exports.API_export_flight = function(req, res){
  var query = url.parse(req.url, true).query;

  var props ={
    includeFeed:      (query.feed)       ? JSON.parse(query.feed)       : true,
    includeImages:    (query.images)     ? JSON.parse(query.images)     : true,
    includeRichloads: (query.richloads)  ? JSON.parse(query.richloads)  : true,
  }

  //Make sure the data is present
  if(!req.body.template){
    return res.status(404).json({
      "message": "Feed json required"
    });
  }

  //Make sure that something is set to be included
  if(!(props.includeFeed || props.includeImages || props.includeRichloads)) {
    return res.status(404).json({
      "message": "Must include one of the following: images, richload, or feed"
    });
  }

  //Export flight
  Blobs.exportFlight(req.body, props)
    .then(pathToZip=>{
      console.log("Download Export: " + pathToZip);
      res.status(200).json({
        "package": pathToZip
      });
    })
    .catch(err => {
      res.status(404).json({
        "message":err
      });
    });
}

