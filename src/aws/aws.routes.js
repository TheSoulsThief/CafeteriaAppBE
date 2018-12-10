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
    /*app.route('/aws')
        .post(authentication.isAuthenticated, image.create)
        .get(authentication.isAuthenticated, image.findByUser);*/
    //app.route('/images/:id').delete(authentication.isAuthenticated, image.delete);
    app.route('/sign-s3-upload')
        .post(authentication.isAuthenticated, aws.signS3Upload);
}

module.exports = setAWSRoutes;
