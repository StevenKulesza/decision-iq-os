
//= ========================
// PRODUCTION
//= ========================//
const prod = {
  // main database config
  database: {
    url: process.env.DB_URL
  },
  // main app config
  app: {
    url: 'http://localhost:3001',
    cdn: 'http://localhost:3001'
  },
  
  // main directories
  directories: {
    uploads: './src/uploads',
    images: './src/public/images',
  },
  // main ports
  port: {
    common: 3001,
    socket: 4001
  }
};

//= ========================
// DEVELOPMENT
//= ========================//
const dev = {
  // main database config
  database: {
    url: process.env.DB_URL
  },
  // main app config
  app: {
    url: 'http://localhost:3001',
    cdn: 'http://localhost:3001'
  },
  
  // main directories
  directories: {
    uploads: './src/uploads',
    images: './src/public/images',
  },
  // main ports
  port: {
    common: 3001,
    socket: 4001
  }
};

//= ========================
// LOCAL
//= ========================//
const local = {
  // main database config
  database: {
    url: process.env.DB_URL
  },
  // main app config
  app: {
    url: 'http://localhost:3001',
    cdn: 'http://localhost:3001'
  },
  
  // main directories
  directories: {
    uploads: './src/uploads',
    images: './src/public/images',
  },
  // main ports
  port: {
    common: 3001,
    socket: 4001
  }
};




var config;
switch(process.env.REACT_APP_STAGE){
  case 'prod':
    config = prod;  break;
  case 'dev':
    config = dev;   break;
  default:
    config = local; break;
}

export default {
  auth: {
    secretKey: process.env.AUTH_SECRET
  },
  ...config
}
