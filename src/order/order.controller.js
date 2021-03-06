/**
 * order controller.
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
var Order            = require('./order.model.js');
//var config = require('../config');
var config          = require('../config/paypal');
var paypal          = require('paypal-rest-sdk');

// TO DO: estas variables se pueden trasladar a un archivo de configuración
var RETURN_URL_PAYPAL = process.env.RETURN_URL_PAYPAL || 'http://apptd.herokuapp.com/paypal/return';
var CANCEL_URL_PAYPAL = process.env.CANCEL_URL_PAYPAL || 'http://apptd.herokuapp.com/paypal/cancel';

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
    return Order.find({}, function (err, orders){
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(orders);
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
function create(req, res) {
    var order = new Order();
    //item.fileName = req.files.item.name;
    //item.url = path.join(req.body.url, req.files.item.path);
    console.log(req.body);
    
    order.user =  req.user._id;
    order.item =  req.body.idItem;
    
    order.save(function(err, order) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(order);
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


/**
 * confirmOrder.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the Order Status
 * @api public
 */

 //****MODIFICAR****
function confirmOrder (req, res){
    // todo: modificar por variables los valores de la estructura
    var createPaymentJson = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': RETURN_URL_PAYPAL,
            'cancel_url': CANCEL_URL_PAYPAL
        },
        'transactions': [{
            'item_list': {
                'items': [{
                    'name': 'Order a dress',
                    'sku': '00003',
                    'price': '15',
                    'currency': 'USD',
                    'quantity': 2
                }]
            },
            'amount': {
                'currency': 'USD',
                'total': '30'
            },
            'description': 'Dress'
        }]
    };
    console.log(createPaymentJson);
    paypal.payment.create(createPaymentJson, function (error, payment) {
        if (error) {
            console.log(error);
            //cb( 1,'Problema al crear el pago', 'error');
            // throw error;res.setHeader('Content-Type', 'application/json');res.send(error); 
            return res.json(error);
        } else {
            console.log('Create Payment Response');
            console.log(payment);
            //res.setHeader('Content-Type', 'application/json');
            //res.send(payment);  
            var href;
            console.log(href);
            for (var index = 0; index < payment.links.length; index++) {
            //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    console.log(payment.links[index].href);
                    href = payment.links[index].href;
                }
            }
            console.log(href);
            if (href !== null){
                return res.status(201).json(href);
                // TO DO: Actualizar inventario y dar de alta el pedido
                // TO DO: se puede invocar a la función Create de este mismo archivo.
                // //res.redirect(href);
                // //Actualizar Pedido
                // //numorder = numorder.replace(/0/g, ''); // quita los ceros del pedido
                // var conditions = { numorder: numorder }
                // , update = { $set: { paymentId: payment.id }}
                // , options = { multi: true };
                // Orders.update(conditions, update, options, function (err, numAffected) {
                // // numAffected is the number of updated documents
                // if (err){
                //     console.log(err);
                //     cb( 1,'No fue posible actualizar el id del pedido');
                // }
                // else{
                //     // actualizar paquetes
                //     cb( 2,'Pedido normal', href);
                // }
                // });
            }
            else
            {
                // res.setHeader('Content-Type', 'application/json');
                // res.send(payment); 
                //cb( 1,'Problema al crear el pago', 'error'); 
                console.log(error);
                return res.status(400).json(error);
            }
        }
    });
}

module.exports = {
    //findByUser: findByUser,
    create: create,
    //delete: deleteItem,
    findAll: findAll,
    confirmOrder: confirmOrder
};
