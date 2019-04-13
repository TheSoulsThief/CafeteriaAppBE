/**
 * Order routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var order          = require('./order.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */
function setOrderRoutes(app) {
    app.route('/orders')
        .post(authentication.isAuthenticated, order.create);
        //.get(authentication.isAuthenticated, order.findByUser);
    app.route('/orders')
        .get(order.findAll);
    app.route('/confirmorder')
        .post(authentication.isAuthenticated, order.confirmOrder);
    //app.route('/orders/:id').delete(authentication.isAuthenticated, order.delete);
}

module.exports = setOrderRoutes;
