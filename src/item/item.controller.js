/**
 * User controller.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var path   = require('path');
var logger = require('mm-node-logger')(module);
var Item  = require('./item.model.js');

/**
 * Find list of items by user id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of items corresponding to the specified user id
 * @api public
 */
function findByUser(req, res) {
    return Item.find({user: req.query.userId}, function (err, items) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(items);
        }
    });
}

function findAll(req, res) {
    return Item.find({}, function (err, items){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(items);
        }
    });
}


/**
 * Create item.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new create item
 * @api public
 */
function create(req, res) {
    var item = new Item();
    //item.fileName = req.files.item.name;
    //item.url = path.join(req.body.url, req.files.item.path);
    console.log(req.body);
    item.fileName = req.body.fileName;
    item.url = req.body.url;
    item.user =  req.user._id;
    item.size = req.body.size;
    item.color = req.body.color;
    item.price =  req.body.price;
    item.garmentName = req.body.garmentName;
    item.fileType = req.body.fileType;

    item.save(function(err, item) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(item);
        }
    });
}

/**
 * Delete item.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
function deleteItem(req, res) {
    Item.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            logger.error(err.message);
            return res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
}

module.exports = {
    findByUser: findByUser,
    create: create,
    delete: deleteItem,
    findAll: findAll
};
