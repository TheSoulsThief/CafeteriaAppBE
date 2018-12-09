/**
 * An application configuration.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Upload files in memory
config.uploadFilesInMemory = process.env.UPLOAD_FILES_IN_MEMORY || false;

// Populate the DB with sample data
config.seedDB = false;

// Token settings
config.token = {
    secret: process.env.TOKEN_SECRET || 'ionic-photo-gallery',
    expiration: process.env.TOKEN_EXPIRATION || 60*60*24 //24 hours
};

// Server settings
config.server = {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || process.env.PORT || 3000
};

// MongoDB settings
config.mongodb = {
    //dbURI: process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ionic-photo-gallery",
   // dbURI: "mongodb://127.0.0.1:27017/ionic-photo-gallery",

   //mongodb://user:123456@localhost:27017/imgnpro
   //dbURI: "mongodb://root:123456@127.0.0.1:27017/admin",
   dbURI: "mongodb://admin:1j79ol4f@ds225902.mlab.com:25902/heroku_9k5qpd5n",
    //dbOptions: {"user": "user2", "pass": "123456"}
    //mongodb://<dbuser>:<dbpassword>@ds225902.mlab.com:25902/heroku_9k5qpd5n
    dbOptions: { useNewUrlParser: true }
};

// redis-13718.c9.us-east-1-2.ec2.cloud.redislabs.com:13718,  7AKiH2TfC3nkhh11UaI8ITULPMGOQ6fz
// Redis settings
if (process.env.REDISTOGO_URL) {
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    process.env.REDIS_HOST = rtg.hostname;
    process.env.REDIS_PORT = rtg.port;
    process.env.REDIS_AUTH = rtg.auth.split(":")[1];
}
// config.redis = {
//     isAvailable: process.env.IS_REDIS_AVAILABLE || true,
//     host: process.env.REDIS_HOST || '127.0.0.1',
//     port: process.env.REDIS_PORT || 6379,
//     auth: process.env.REDIS_AUTH || '',
//     options: {}
// };

config.redis = {
    isAvailable: process.env.IS_REDIS_AVAILABLE || true,
    host: process.env.REDIS_HOST || 'redis-19858.c9.us-east-1-2.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 19858,
    //password: process.env.auth_password || '7AKiH2TfC3nkhh11UaI8ITULPMGOQ6fz',
    auth: process.env.REDIS_AUTH || '123456',
    options: {}
};

// Export configuration object
module.exports = config;
