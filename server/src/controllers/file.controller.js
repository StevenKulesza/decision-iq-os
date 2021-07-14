import express from 'express'
import mongoose from 'mongoose'

// global config
import config from '../config/main'

// models
import File from '../models/file.model'

// create file
exports.create_file = function(data){
  return new Promise(function(resolve, reject){
    File.find({name: data.name})
    .exec()
    .then(files => {
      console.log(files)
      if(files.length >= 1){
        reject('file already exists');
      } else {
        //create a new file
        const newFile = new File({
          _id: new mongoose.Types.ObjectId(),
          name: req.files[i].originalname,
          size: req.files[i].size,

          // need to change from hardcoded localhost string
          path: config.app.cdn + '/uploads/' + req.files[i].originalname,
          date: req.body.date
        });

        //save the user to the database
        newFile
          .save()
          .then(result => {
              console.log('File created');
              resolve(newFile);
          })
          .catch(reject);
      }
    })
    .catch(reject);
  })
}

exports.api_create_file = function(req, res){
  exports.create_file(req.body)
    .then(file => {
      console.log(file);
      res.status(201).json({
        message: 'File created'
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      });
    })
}

exports.get_all_files = function(req, res) {
  File.find({})
  .exec(function(err, dbfiles){
    if(err){
      res.send('get error has occured in routes/files.js');
    } else {
      res.json(dbfiles);
    }
  });
};

exports.get_one_file = function(req, res) {
  File.findOne({'name': req.params.id})
  .exec(function(err, dbfiles){
    if(err){
      res.send('get error has occured in routes/files.js');
    } else {
      res.json(dbfiles);
    }
  });
};
