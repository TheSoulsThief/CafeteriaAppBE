/**
 * Item routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var rent          = require('./rent.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */
function setRentRoutes(app) {
    app.route('/rents')
        .post(authentication.isAuthenticated, rent.create)
        //.get(authentication.isAuthenticated, rent.findByUser);
    app.route('/rents')
        .get(rent.findAll);
    //app.route('/rents/:id').delete(authentication.isAuthenticated, rent.delete);
}

module.exports = setRentRoutes;
