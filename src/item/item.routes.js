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
var item          = require('./item.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */
function setItemRoutes(app) {
    app.route('/items')
        .post(authentication.isAuthenticated, item.create)
        .get(authentication.isAuthenticated, item.findByUser);
    app.route('/items')
        .get(item.findAll);
    app.route('/items/:id').delete(authentication.isAuthenticated, item.delete);

}

module.exports = setItemRoutes;
