/**
 * Rent routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var favorite          = require('./favorite.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */
function setFavoriteRoutes(app) {
    app.route('/favorite')
        .post(authentication.isAuthenticated, favorite.create)
        .get(authentication.isAuthenticated, favorite.findAll);
    app.route('/favorite/:id')
        .get(authentication.isAuthenticated, favorite.find)
        .delete(authentication.isAuthenticated, favorite.delete);
}

module.exports = setFavoriteRoutes;
