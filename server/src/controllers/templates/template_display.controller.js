import express from 'express'
import mongoose from 'mongoose'

// model
import Template_display from '../../models/template_display.model'


exports.get_all_templates = function(data){
    return new Promise(function(resolve, reject){
      Template_display.find({business: {$in:[null, data.businessName]} })
      .exec()
      .then(templates => {
        resolve({
          "type": "display",
          "content": templates
        });
      })
      .catch(reject);
    })
    
}

exports.API_get_all_templates = function(req, res){
  exports.get_all_templates(req.userData)
    .then(templates => {
      res.status(200).json(templates);
    })
    .catch(err => {
      res.status(404).json({
          error: err
      });
    })  
}

exports.create_template = function(data){
  return new Promise(function(resolve, reject){
    Template_display.find({name: data.name})
    .exec()
    .then(templates => {
      if(templates.length >= 1){
        reject('Template already exists');
      }else{
        //create a new user
        const newTemplate = new Template_display({
          _id: new mongoose.Types.ObjectId(),
          name: data.name,
          description: data.description,
          type: "display",
          imageUrl: data.imageUrl,
          sizes: data.sizes,
          template: data.template,
          business: data.business
        });

        //save the user to the database
        newTemplate
          .save()
          .then(result => {
              console.log('Template created');
              console.log(newTemplate);
              resolve(newTemplate);
          })
          .catch(reject);
      }
    })
    .catch(reject);
  })
}

exports.API_create_template = function(req, res){
  exports.create_template(req.body)
    .then(template => {
      console.log(template);
      res.status(201).json({
        message: 'Template created'
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      });
    })  
}


exports.API_delete_template = function(req, res){
  Template_display.remove({ name: req.body.name })
    .exec()
    .then(result => {
      if(result.n >= 1){
        res.status(202).json({
            message: 'Template deleted'
        });
      }else{
        res.status(404).json({
          message: 'Template not found. No template deleted'
        })
      }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}