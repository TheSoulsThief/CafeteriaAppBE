/**
 * Image model.
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
 * Image Schema
 */
var ImageSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    size: {
        type: String
    },
    color: {
        type: String
    }
    // TODO: Ocasion
    // TODO: Formalidad
});

module.exports = mongoose.model('Image', ImageSchema);
