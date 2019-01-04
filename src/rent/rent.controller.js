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
//var config = require('../config');
var config = require('../config/paypal');
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


/**
 * confirmOrder.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the Order Status
 * @api public
 */
function doConfirmOrder(req,res){
    var createPaymentJson = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': config.paypal.return_url,
            'cancel_url': config.paypal.cancel_url
        },
        'transactions': [{
            'item_list': {
                'items': [{
                    'name': 'Images',
                    'sku': '00001',
                    'price': order.totalpay,
                    'currency': 'USD',
                    'quantity': 1
                }]
            },
            'amount': {
                'currency': 'USD',
                'total': order.totalpay
            },
            'description': 'Images'
        }]
    };
    console.log(createPaymentJson);
    paypal.payment.create(createPaymentJson, function (error, payment) {
        if (error) {
            console.log(error);
            cb( 1,'Problema al crear el pago', 'error');
                // throw error;
            //res.setHeader('Content-Type', 'application/json');
            //res.send(error); 

        } else {
        
            console.log("Create Payment Response");
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

            if (href != null){
                //res.redirect(href);
                //Actualizar Pedido

                //numorder = numorder.replace(/0/g, ''); // quita los ceros del pedido
                var conditions = { numorder: numorder }
                , update = { $set: { paymentId: payment.id }}
                , options = { multi: true };
                Orders.update(conditions, update, options, function (err, numAffected) {
                // numAffected is the number of updated documents
                
                if (err){
                    console.log(err);
                    cb( 1,'No fue posible actualizar el id del pedido');
                }
                else{
                    // actualizar paquetes
                    cb( 2,'Pedido normal', href);
                }
                });
            }
            else
            {
                // res.setHeader('Content-Type', 'application/json');
                // res.send(payment); 
                cb( 1,'Problema al crear el pago', 'error'); 
            }
        }
    });
};

      

module.exports = {
    //findByUser: findByUser,
    create: create,
    //delete: deleteItem,
    findAll: findAll
};
