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

/**
 * Set item routes.
 *
 * @param {Object} app The express application
 */

 // to avoid favicon request from web browser  
function setIndexRoutes(app) {
    app.route('/favicon.ico')
        .get((req,res) => res.status(204));
}

module.exports = setIndexRoutes;