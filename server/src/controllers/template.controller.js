import express from 'express'

// models
import Template_display from './templates/template_display.controller'
import Template_video from './templates/template_video.controller'
import Template_social from './templates/template_social.controller'
import Template_email from './templates/template_email.controller'


exports.API_get_all_templates = function(req, res){
  Promise.all([
      Template_display.get_all_templates(req.userData),
      Template_video.get_all_templates(req.userData),
      Template_social.get_all_templates(req.userData),
      Template_email.get_all_templates(req.userData)
    ])
    .then(values => {
      console.log(values);

      res.status(200).json(values);
    })
    .catch(err => {
      res.status(500).json({error:err});
    });
}


exports.API_delete_template = function(req, res){
  Template.remove({ name: req.body.name })
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