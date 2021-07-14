import express from 'express'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/main';

// model
import User from '../models/user.model'
import Business from '../models/business.model'

// controller
import BusinessController, { create_business } from '../controllers/business.controller'

exports.API_get_all_users = function(req, res){
  User.find()
    .exec()
    .then(users => {
      if(users.length < 1){
        return res.status(404).json({
          'message':'No users found'
        })
      }

      res.status(200).json(users.map(user => {
        return {
          _id: user._id,
          email: user.email,
          businessName: user.businessName,
          permissions: user.permissions
        }
      }));
    })
    .catch();
}


exports.API_get_login_token = function(req, res){
  User.find({ email: req.body.email })
    .exec()
    .then(users => {

      //if no user is found
      if(users.length < 1){
        console.log('Authentication failed: No user found');
        return res.status(401).json({
          message: 'Authentication failed'
        })
      }

      //if a user is found
      bcryptjs.compare(req.body.password, users[0].password, (err, result) => {
        //if there was an error
        if(err){
          console.log('Authentication failed: Password compare error');
          return res.status(401).json({
            message: 'Authentication failed'
          });
        }

        //if there is no error
        if(result){

          //create new token
          const token = jwt.sign(
            {
                email: users[0].email,
                userId: users[0]._id,
                businessName: users[0].businessName
            }, 
            config.auth.secretKey,
            {expiresIn: '2h'}
          );

          Business.find({ businessName: users[0].businessName })
            .exec()
            .then(clients => {
              //respond with token
              return res.status(200).json({
                message: 'Authentication succeeded',
                token: token,
                user: {
                  email: users[0].email,
                  permissions: users[0].permissions
                },
                client: {
                  name: clients[0].businessName,
                  thumbnail: clients[0].thumbnail,
                }
              })
            })
            .catch(err => { //probably didnt find client (by id)
              console.log('Authentication failed: No client found');
              console.log(err);
              res.status(500).json({
                message: 'Authentication failed'
              });
            })
         
        }
      });

    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};


exports.API_create_user = function(req, res){
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1){
        return res.status(409).json({
          message: 'Email already in use'
        })
      }else{

        //hash the password
        bcryptjs.hash(req.body.password, 10, (err, hash) => {
          if(err){
            return res.status(500).json({
              error: err
            })
          }else{
            //create a new user
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              businessName: req.body.businessName,
              email: req.body.email,
              password: hash,
              dbName: req.body.dbName,
              permissions: req.body.permissions
            });

            //save the user to the database
            newUser
              .save()
              .then(result => {
                  console.log(newUser);
                  BusinessController.create_business(
                    {
                      businessName: req.body.businessName
                    }
                  );
                  res.status(201).json({
                      message: 'User created'
                  });
              })
              .catch(err => {
                  console.log(err);
                  res.status(500).json({
                      error: err
                  });
              });


          }
        });

      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
    });
  
}

exports.API_delete_user = function(req, res){
  User.remove({ email: req.body.email })
    .exec()
    .then(result => {
      if(result.n >= 1){
        res.status(200).json({
            message: 'User deleted'
        });
      }else{
        res.status(404).json({
          message: 'User not found. No user deleted'
        })
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}