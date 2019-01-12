/**
 * Address routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var address          = require('./address.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */
function setAddressRoutes(app) {
    app.route('/address')
        .post(address.create);
    app.route('/address')
        .get(authentication.isAuthenticated, address.findAll);
    app.route('/address/:id')
        .delete(authentication.isAuthenticated, address.delete);
}

module.exports = setAddressRoutes;
