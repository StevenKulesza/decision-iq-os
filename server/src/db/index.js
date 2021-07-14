const mongoose = require('mongoose');
import config from '../config/main';

const options = {
  useNewUrlParser: true,
  keepAlive: 1,
  connectTimeoutMS: 30000
};

mongoose.connect(config.database.url, options);
