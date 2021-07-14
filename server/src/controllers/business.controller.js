import express from 'express'
import mongoose from 'mongoose'

// model
import Business from '../models/business.model'

exports.API_get_all_businesses = function(req, res){
  Business.find()
    .exec()
    .then(clients => {
      if(clients.length < 1){
        return res.status(404).json({
          'message':'No businesses found'
        })
      }

      res.status(200).json(clients);
    })
    .catch(err => { 
      console.log(err)
      res.status(500).json({
      error: err
    })});
}

exports.create_business = function(data){
  return new Promise(function(resolve, reject){
    Business.find({businessName: data.businessName})
    .exec()
    .then(clients => {
      if(clients.length >= 1){
        reject('Business already exists');
      }else{
        //create a new user
        const newBusiness = new Business({
          _id: new mongoose.Types.ObjectId(),
          businessName: data.businessName,
          thumbnail: data.thumbnail,
          api: data.api
        });

        //save the user to the database
        newBusiness
          .save()
          .then(result => {
              console.log('Business created');
              console.log(newBusiness);
              resolve(newBusiness);
          })
          .catch(reject);
      }
    })
    .catch(reject);
  })
}

exports.API_create_business = function(req, res){
  exports.create_business(req.body)
    .then(client => {
      console.log(client);
      res.status(201).json({
        message: 'Business created'
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      });
    })  
}


exports.API_delete_business = function(req, res){
  Business.remove({ businessName: req.body.businessName })
    .exec()
    .then(result => {
      if(result.n >= 1){
        res.status(202).json({
            message: 'Business deleted'
        });
      }else{
        res.status(404).json({
          message: 'Business not found. No business deleted'
        })
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}