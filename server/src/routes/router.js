import express      from 'express'
import path         from 'path'

import business     from '../controllers/business.controller'
import user         from '../controllers/user.controller'
import feed         from '../controllers/feed.controller'
import file         from '../controllers/file.controller'
import userAuth     from '../services/auth.service'
import permissions  from '../services/permission.service'
import blob         from '../services/blob.service'
import flight       from '../services/flight.service'
import template     from '../controllers/template.controller'
  import template_display   from '../controllers/templates/template_display.controller'
  import template_video     from '../controllers/templates/template_video.controller'
  import template_social    from '../controllers/templates/template_social.controller'
  import template_email     from '../controllers/templates/template_email.controller'



module.exports = function (app) {

  // Initializing route groups
  const apiRoutes   = express.Router(),
    businessRoutes  = express.Router(),
    templateRoutes  = express.Router(),
    userRoutes      = express.Router(),
    blobRoutes      = express.Router(),
    flightRoutes    = express.Router(),
    feedRoutes      = express.Router(),
    fileRoutes      = express.Router(),
    indexRoutes     = express.Router();


  //= ========================
  // Static Files
  //= ========================//
  app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));
  app.use('/exports', express.static(path.join(__dirname, '..', '/exports')));
  app.use('/templates', express.static(path.join(__dirname, '..', '/templates')));

  //= ========================
  // Business Routes
  //= ========================//

  // bind to api routes
  apiRoutes.use('/businesses',      businessRoutes);

    // Create business
    businessRoutes.post('/create',  business.API_create_business);

    // Delete business
    businessRoutes.delete('/',      business.API_delete_business);

    //Get businesses
    businessRoutes.get('/',         business.API_get_all_businesses);

  //= ========================
  // User Routes
  //= ========================//

  // bind to api routes
  apiRoutes.use('/users', userRoutes);
    // Get login token
    userRoutes.post('/login',     user.API_get_login_token);

    // Create user
    userRoutes.post('/create',    user.API_create_user);

    // Delete user
    userRoutes.delete('/',        userAuth,  permissions.include('admin'),   user.API_delete_user);

    //Get users
    userRoutes.get('/',           user.API_get_all_users);



  //= ========================
  // Template Routes
  //= ========================//

  // bind to api routes
  apiRoutes.use('/templates', templateRoutes);

    // Get templates
    templateRoutes.get('/',                 userAuth,   template.API_get_all_templates);

    //Display Templates
    templateRoutes.get('/display',          userAuth,   template_display.API_get_all_templates);
    templateRoutes.post('/display/create',  userAuth,   template_display.API_create_template);
    templateRoutes.delete('/display',       userAuth,   template_display.API_delete_template);
    
    //Video Templates
    templateRoutes.get('/video',            userAuth,   template_video.API_get_all_templates);
    templateRoutes.post('/video/create',    userAuth,   template_video.API_create_template);
    templateRoutes.delete('/video',         userAuth,   template_video.API_delete_template);

    //Social Templates
    templateRoutes.get('/social',           userAuth,   template_social.API_get_all_templates);
    templateRoutes.post('/social/create',   userAuth,   template_social.API_create_template);
    templateRoutes.delete('/social',        userAuth,   template_social.API_delete_template);

    //Email Templates
    templateRoutes.get('/email',            userAuth,   template_email.API_get_all_templates);
    templateRoutes.post('/email/create',    userAuth,   template_email.API_create_template);
    templateRoutes.delete('/email',         userAuth,   template_email.API_delete_template);


  //= ========================
  // Blob Routes
  //= ========================//

  // add 'userAuth' middleware once complete

  // Bind to api routes
  apiRoutes.use('/blobs', blobRoutes);

    // Get all blobs
    blobRoutes.get('/',                 blob.listBlobs);

    // Create blob container
    blobRoutes.put('/container/create', blob.createContainer);

    // Upload a blob
    blobRoutes.put('/upload/create',    blob.uploadBlob);

    // Download a blob
    blobRoutes.get('/download/',        blob.downloadBlob);

    // Delete a blob
    blobRoutes.delete('/delete',        userAuth, blob.deleteBlob);



  //= ========================
  // Flight Routes
  //= ========================//

  // add 'userAuth' middleware once complete

  apiRoutes.use('/flights', flightRoutes);

    // Get all flights
    flightRoutes.get('/',               flight.getSavedFlights);

    //Get list of flights (not actual flight data)
    flightRoutes.get('/list',           flight.getSavedFlightsList);
    
    // Get flight by flight name
    flightRoutes.get('/:name',          flight.getSavedFlight);

    // Save given flight
    flightRoutes.post('/save',          flight.saveFlight);
    
    // Save given flight
    flightRoutes.patch('/save',         flight.updateFlight);

    // Delete a flight
    flightRoutes.delete('/delete',      flight.deleteFlight);

    // Publish a flight
    flightRoutes.post('/publish',       flight.publishFlight);

  
  //= ========================
  // Feed Routes
  //= ========================//

    // add 'userAuth' middleware once complete

  // bind to api routes
  apiRoutes.use('/feeds', feedRoutes);

    // Create user
    feedRoutes.post('/create',          feed.API_create_feed);

    // Delete feed
    feedRoutes.delete('/',              feed.API_delete_feed);

    // Get feeds
    feedRoutes.get('/',                 feed.API_get_all_feeds);
    
    // Get flight export
    feedRoutes.post('/export',          feed.API_export_flight);

    // Convert csv to json
    feedRoutes.put('/json/create',      feed.API_csvToJson);
    
    // Get feed
    feedRoutes.get('/:id',              feed.API_get_one_feed);

    // Download Feed
    feedRoutes.get('/:id/download',     feed.API_download_one_feed);

    // Get feed audience
    feedRoutes.get('/:id/:audienceId',  feed.API_get_one_feed_audience);


  //= ========================
  // File Routes
  //= ========================//

    // add 'userAuth' middleware once complete

  // bind to api routes
  apiRoutes.use('/files', fileRoutes);

    // Get files
    fileRoutes.get('/',       file.get_all_files);

    // Get file
    fileRoutes.get('/:id',    file.get_one_file);



  //= ========================
  // Index Routes
  //= ========================//

    // Set Main index Route
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    // production
    // serve client bundle to index route
    app.use(express.static(path.join(__dirname, '..', '..', '/build')));
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', '/build/index.html'));
    });
  } else {
    // developement
    // serve index as express page
    // proxy server to client app
    apiRoutes.use('/',
      indexRoutes.get('/', function(req, res, next) { 
        res.render('index', { title: 'Express', layout: 'layout.hbs' }) 
      })
    );
  }

    // Set url for API group routes
    app.use('/', apiRoutes);
}
