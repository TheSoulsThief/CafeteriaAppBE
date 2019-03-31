/**
 * Populate DB with sample data on server start to disable, edit config.js, and set `seedDB: false`
 *
 * @author    Johnny Yankee {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2017, Johnny Yankee
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */

 // Se desactivó este módulo porque no se usará para llenar la BD
 // posteriormente se deberá eliminar
// 'use strict';

// /**
//  * Module dependencies.
//  */
// var logger   = require('mm-node-logger')(module);
// var mongoose = require('mongoose');
// var User     = require('../user/user.model');
// var Item    = require('../item/item.model');

// var testUserId = mongoose.Types.ObjectId();

// User.find({}).remove(function() {
//     User.create({
//             provider: 'local',
//             name: 'Johnny Yankee',
//             email: 'martinmicunda@test.com',
//             password: 'test',
//             avatar: 'https://avatars2.githubusercontent.com/u/1643606?v=3'
//         }, {
//             _id: testUserId,
//             provider: 'local',
//             name: 'Test',
//             email: 'test@test.com',
//             password: 'test'
//         }, {
//             provider: 'local',
//             name: 'Admin',
//             email: 'admin@admin.com',
//             password: 'admin'
//         }, function() {
//             logger.info('Finished populating users');
//         }
//     );
// });

// Item.find({}).remove(function() {
//     Item.create({
//         fileName : 'Slovakia 1',
//         url : 'http://www.rocketroute.com/wp-content/uploads/Carpathian-mountains-Slovakia-685x458.jpg?125416',
//         user: testUserId
//     }, {
//         fileName : 'Slovakia 2',
//         url : 'http://www.travelslovakia.sk/images/blog/small-group-tours/tatra-mountains-self-guided.jpg?125416',
//         user: testUserId
//     }, {
//         fileName : 'Slovakia 3',
//         url : 'http://www.travelslovakia.sk/images/day-tours/high-tatras.jpg?125416',
//         user: testUserId
//     }, function() {
//         logger.info('Finished populating images');
//     });
// });
