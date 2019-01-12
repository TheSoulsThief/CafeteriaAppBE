/**
 * Address model.
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

/**
 * Item Schema
 */
var AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    mainAddress: {
        type: Boolean
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    },
    references: {
        type: String
    },
    extraReferences: {
        type: String
    },
    street: {
        type: String
    },
    number: {
        type: String
    },
    noNumber: {
        type: Boolean
    },
    addressComment: {
        type: Boolean
    },
    neighborhood: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Address', AddressSchema);
