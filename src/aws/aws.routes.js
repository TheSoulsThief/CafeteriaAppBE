/**
 * AWS routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var aws          = require('./aws.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set AWS routes.
 *
 * @param {Object} app The express application
 */
function setAWSRoutes(app) {
        app.route('/sign-s3-upload').get(authentication.isAuthenticated, aws.signS3Upload);
        app.route('/sign-s3-single').get(authentication.isAuthenticated, aws.signS3Single);
}

module.exports = setAWSRoutes;
