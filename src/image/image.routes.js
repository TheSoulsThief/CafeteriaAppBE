/**
 * Image routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var image          = require('./image.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set image routes.
 *
 * @param {Object} app The express application
 */
function setImageRoutes(app) {
    app.route('/images')
        .post(authentication.isAuthenticated, image.create)
        .get(authentication.isAuthenticated, image.findByUser);
    app.route('/items')
        .get(image.findAll);
    app.route('/images/:id').delete(authentication.isAuthenticated, image.delete);

}

module.exports = setImageRoutes;
