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
//var path   = require('path');
var logger = require('mm-node-logger')(module);
var Rent  = require('./rent.model.js');

/**
 * Find list of items by user id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of items corresponding to the specified user id
 * @api public
 */
// function findByUser(req, res) {
//     return Item.find({user: req.query.userId}, function (err, items) {
//         if (err) {
//             logger.error(err.message);
//             return res.status(400).send(err);
//         } else {
//             return res.json(items);
//         }
//     });
// }

function findAll(req, res) {
    return Rent.find({}, function (err, rents){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(rents);
        }
    });
}


/**
 * Create Rent.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new create rent
 * @api public
 */
function create(req, res) {
    var rent = new Rent();
    //item.fileName = req.files.item.name;
    //item.url = path.join(req.body.url, req.files.item.path);
    console.log(req.body);
    
    rent.user =  req.user._id;
    rent.item =  req.body.idItem;
    
    rent.save(function(err, rent) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(rent);
        }
    });
}

/**
 * Delete rent.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @api public
 */
// function deleteItem(req, res) {
//     Item.findByIdAndRemove(req.params.id, function(err) {
//         if (err) {
//             logger.error(err.message);
//             return res.status(500).send(err);
//         } else {
//             res.sendStatus(204);
//         }
//     });
// }

module.exports = {
    //findByUser: findByUser,
    create: create,
    //delete: deleteItem,
    findAll: findAll
};
