/**
 * Authentication routes.
 *
 * @author    Johnny Yankee {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2017, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var authentication = require('./authentication.controller.js');

/**
 * Set authentication routes.
 *
 * @param {Object} app The express application
 */
function setAuthenticationRoutes(app) {
    app.route('/auth/signin').post(authentication.signin);
    app.route('/auth/signout').get(authentication.signout);
    app.route('/auth/signup').post(authentication.signup);
    app.route('/auth/isAuthenticated').get(authentication.isAuthenticated);
    app.route('/auth/forgotPassword').post(authentication.forgotPassword);
}

module.exports = setAuthenticationRoutes;
