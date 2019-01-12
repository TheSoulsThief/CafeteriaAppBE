/**
 * Address controller.
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
var Address         = require('./address.model.js');


/**
 * Find list of address by user id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of address corresponding to the specified user id
 * @api public
 */
function findAll(req, res) {
    return Address.find({}, function (err, addresses){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(addresses);
        }
    });
}

/**
 * Create Address.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new create address
 * @api public
 */
function createAddress(req, res) {
    var address = new Address();
    console.log(req.body);
    address.user =  req.user._id;
    address.mainAddress =  req.body.mainAddress;
    address.city =  req.body.city;
    address.state =  req.body.state;
    address.country =  req.body.country;
    address.zipCode =  req.body.zipCode;
    address.references =  req.body.references;
    address.extraReferences =  req.body.extraReferences;
    address.street =  req.body.street;
    address.number =  req.body.number;
    address.noNumber =  req.body.noNumber;
    address.addressComment =  req.body.addressComment;
    address.neighborhood =  req.body.neighborhood;

    // TO DO: agregar los demás atributos
    address.save(function(err, address) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(address);
        }
    });
}

/**
 * Delete address.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
function deleteAddress(req, res) {
    Address.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            logger.error(err.message);
            return res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
}

module.exports = {
    create: createAddress,
    delete: deleteAddress,
    findAll: findAll
};
