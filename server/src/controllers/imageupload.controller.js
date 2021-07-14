import express from 'express'
import mongoose from 'mongoose'

// model
import ImageUpload from '../models/imageupload.model'

exports.creatImageUpload = function(name, clientName, flightName, blobPath, metadata, tags){
  return new Promise((resolve, reject)=>{
    ImageUpload.find({name: name, clientName: clientName, flightName: flightName})
    .exec()
    .then(imageUpload => {
      if(imageUpload.length >= 1){
        reject('An image with that name already exists');
      } else {
        const newImageUpload = new ImageUpload({
          _id: new mongoose.Types.ObjectId(),
          name: name,
          clientName: clientName,
          flightName: flightName,
          blobPath: blobPath,
          tags: tags,
          metadata: metadata
        });

        //save the user to the database
        newImageUpload
          .save()
          .then(result => {
              resolve(newImageUpload);
          })
          .catch(err => {
            reject(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json({
          error: err
      });
    });
  })
}

exports.getImageUpload = function(name){
  return new Promise((resolve, reject)=>{
    ImageUpload.find({name: name})
    .exec()
    .then(imageUpload => {
      if(imageUpload.length < 1){
        reject('No image with the name "'+name+'" exists');
      }else{
        resolve(imageUpload[0]);
      }
    })
    .catch(err => {
      res.status(500).json({
          error: err
      });
    });
  })
}

exports.getImageUploads = function(selector){
  return new Promise((resolve, reject)=>{
    ImageUpload.find(selector)
    .exec()
    .then(imageUploads => {
        resolve(imageUploads);
    })
    .catch(err => {
      res.status(500).json({
          error: err
      });
    });
  })
}

exports.deleteImageUpload = function(name){
  return new Promise((resolve, reject)=>{
    ImageUpload.remove({ name: name })
    .exec()
    .then(result => {
      if(result.n >= 1){
        resolve('Image upload deleted');
      }else{
        reject('Image upload not found. No Image upload deleted');
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
  });
  
}

exports.deleteImageUploadByBlobName = function(blobPath){
  return new Promise((resolve, reject)=>{
    ImageUpload.remove({ blobPath: blobPath })
    .exec()
    .then(result => {
      if(result.n >= 1){
        resolve('Image upload deleted');
      }else{
        reject('Image upload not found. No Image upload deleted');
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
  });
}