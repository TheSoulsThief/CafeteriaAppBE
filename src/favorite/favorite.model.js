/**
 * Rent model.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User = require('../user/user.model.js');
var Item = require('../item/item.model.js');

/**
 * Rent Schema
 */
var FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item
    }
    
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
