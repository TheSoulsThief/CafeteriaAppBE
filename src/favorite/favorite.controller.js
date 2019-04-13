/**
 * Order controller.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
//var path   = require('path');
var logger          = require('mm-node-logger')(module);
var Favorite            = require('./favorite.model.js');

/**
 * Find list of items by user id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of items corresponding to the specified user id
 * @api public
 */


function findAll(req, res) {
    return Favorite.find({}, function (err, favorites){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(favorites);
        }
    });
}

/**
 * Create Order.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new create order
 * @api public
 */
function createFavorite(req, res) {
    var favorite = new Favorite();
    console.log(req.body);
    
    favorite.user =  req.user._id;
    favorite.item =  req.body.idItem;
    
    favorite.save(function(err, favorite) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(favorite);
        }
    });
}

/**
 * Delete order.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
function deleteFavorite(req, res) {
    Favorite.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            logger.error(err.message);
            return res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
}

/**
 * Find one favorite.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
function findFavorite(req, res) {
    Favorite.findOne({_id:req.params.id}, function (err, favorite){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(favorite);
        }
    });
}

module.exports = {
    create: createFavorite,
    delete: deleteFavorite,
    find: findFavorite,
    findAll: findAll
};
