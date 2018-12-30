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
var Image  = require('./image.model.js');

/**
 * Find list of images by user id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of images corresponding to the specified user id
 * @api public
 */
function findByUser(req, res) {
    return Image.find({user: req.query.userId}, function (err, images) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(images);
        }
    });
}

function findAll(req, res) {
    return Image.find({}, function (err, images) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(images);
        }
    });
}


/**
 * Create image.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new create image
 * @api public
 */
function create(req, res) {
    var image = new Image();
    //image.fileName = req.files.image.name;
    //image.url = path.join(req.body.url, req.files.image.path);
    console.log(req.body);
    image.fileName = req.body.fileName;
    image.url = req.body.url;
    //image.user = req.body.userId;
    image.user =  req.user._id;
    image.size = req.body.size;
    image.color = req.body.color;

    image.save(function(err, image) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(image);
        }
    });
}

/**
 * Delete image.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
function deleteImage(req, res) {
    Image.findByIdAndRemove(req.params.id, function(err) {
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
    delete: deleteImage,
    findAll: findAll
};
