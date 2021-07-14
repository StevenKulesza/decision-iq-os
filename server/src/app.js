import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import assert from 'assert';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import config from './config/main';
import db from './db/index';
import utils from './lib/utils';

dotenv.config();

// routes
import Router from  './routes/router';

const app = express();

mongoose.Promise = global.Promise;

// handlebars as view
app.engine('hbs', hbs({extname: 'hbs', layoutsDir: __dirname + '/views/'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const debug = require('debug')('react-backend:server');

//= ========================
// Routes
//= ========================//

Router(app);

//= ========================
// Port Config
//= ========================//

const port = utils.normalizePort(process.env.PORT || config.port.common);
app.set('port', port);
app.listen(port, () => { console.log("Server listening on port " + port) });

//= ========================
// Errors
//= ========================//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
