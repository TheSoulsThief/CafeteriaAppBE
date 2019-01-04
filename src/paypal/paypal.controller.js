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
/*var path   = require('path');
var logger = require('mm-node-logger')(module);*/
var logger = require('mm-node-logger')(module);
//var aws = require('aws-sdk');
//var express = require('express');
//var config = require('../config');
//var Orders = require('../models/order.js');
//var OrderPacks = require('../models/orderpacks.js');
//var User_details = require('../models/user_details.js');
var mailer = require('../modules/send_email.js'); // Módulo para enviar correo
//var router = express.Router();
var paypal = require('paypal-rest-sdk');
//var User = require('../models/user.js');
require('../config_paypal');

//var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'doresuprueba';
//aws.config.region = 'us-east-1';
/**
 * Crea .
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {String} 
 * @api public
 */

function payment (req, res){
  console.log(req.body);
  console.log(req.query);
  //var paymentId = req.query['paymentId'];
  //var payer_id = req.query['PayerID']; 
  var paymentId = req.body.paymentId;
  var payer_id = req.body.PayerID; 
  
  var execute_payment_json = {
        "payer_id": payer_id
  };

  Orders.findOne({paymentId:paymentId},function(err,orderrecord){
    if (err){
       req.session.message = 'Ocurrió un error al buscar, No se encontró un pedido para el id de pago';
       res.redirect( '/error' );
     }
     else
     {
        if(orderrecord){
            paypal.payment.execute(paymentId, execute_payment_json, function (err, payment) {
                if (err) {
                   console.log(err);
                       // throw error;
                   req.session.message = 'Ocurrió un error al realizar el pago: ' + err;
                   res.redirect( '/error' );
                } else {
                    console.log("Get Payment Response");
                    console.log(JSON.stringify(payment));

                  var numorder = orderrecord.numorder; 
                  var conditions = { numorder: numorder }
                    , update = { $set: { status: 'En Proceso' }}
                    , options = { multi: true };
              
                    Orders.update(conditions, update, options, function (err, numAffected) {
                      // numAffected is the number of updated documents
                     
                      //console.log(numAffected);
                      if (err){
                          console.log(err);
                          req.session.message = 'Ocurrió un error al guardar el pedido: ';
                          res.redirect( '/error/' + numorder );
                      }
                      else{
                          // actualizar paquetes

                          OrderPacks.update(conditions, update, options, function (err, numAffected) {
                            // numAffected is the number of updated documents
                           
                            //console.log(numAffected);
                            if (err){
                                console.log(err);
                                req.session.message = 'Ocurrió un error al guardar el paquete del pedido: ';
                                res.redirect('/error/' + numorder );
                            }
                            else{
                                // actualizar paquetes
                                User_details.findOne({userid:req.user._id},function(err,user_details){
                                    if (err){
                                      req.session.message = 'Ocurrió un error al buscar los detalles del usuario: ';
                                      console.log(err);
                                    } 
                                    else{
                                        // Si el usuario pide factura 
                                        if(user_details.chk_factura == 'chk_factura'){
                                          var mailOptions = {
                                            from: '"Server" <server@mail-imgnpro.com>', // sender address
                                            to: 'makeacfdi@mail-imgnpro.com, jerh56@gmail.com', // list of receivers
                                            //to: 'jerh56@gmail.com', // list of receivers
                                            subject: 'Factura', // Subject line
                                            text: '', // plaintext body
                                            //html: '<a href="www.imgnpro.com/confirmuser"</a>' // html body
                                            html: '<html>' + 'Hola, el nombre de mi empresa es ' + user_details.factrazonsocial +
                                            '<br><b> Necesito una factura electrónica</b><br>' + 'Mis datos son los siguientes:<br> <b>' + 
                                            'Razón social:' + user_details.factrazonsocial + '<br>' +
                                            'RFC:' + user_details.factrfc + '<br>' +
                                            'Domicilio:' + user_details.factcalle + ',' + 
                                                           user_details.factcolonia + ',' + 
                                                           user_details.factnum_ext + ',' +
                                                           user_details.factnum_int + ',' +
                                                           user_details.factmunicipio + ',' +
                                                           user_details.factciudad + ',' +
                                                           user_details.factestado + ',' +
                                                           user_details.sel_factcountry + ',' + '<br>' +
                                            'Número de pedido:' + numorder + '<br>' +
                                            'Monto total: USD ' + orderrecord.totalpay + '<br>' +
                                            'Método de pago:' + user_details.factpaymethod + '<br>' +
                                            'Terminación de la tarjeta:' + user_details.factterminacion + '<br>' +
                                            'e-mail:  <span>' + user_details.factemail2 + '</span><br></b></html>'  // html body
                                          };
                                          mailer.sendEmail(mailOptions);
                                        }
                                    } 
                                });
                                var userDoc = {
                                    'usertype':'designer',
                                    'disabled':false
                                };
                                findUsers( userDoc, ( err, msg, designers ) => {
                                    console.log( err, msg,designers ); 
                                    if (err == 2){
                                        var hostname = req.headers.host;
                                        var mailOptions = {
                                            from: '"Server" <server@mail-imgnpro.com>', // sender address
                                            to: 'jerh56@gmail.com', // list of receivers
                                            subject: 'Hay nuevos paquetes por atender', // Subject line
                                            text: `Por favor ingresa al portal http://${hostname}/de_login`
                                        };
                                        mailer.sendEmail(mailOptions);
                                    }else if ( err === 0){
                                        var hostname = req.headers.host;
                                        var useremails = getUserEmails(designers);
                                        var mailOptions = {
                                            from: '"Server" <server@mail-imgnpro.com>', // sender address
                                            to: useremails, // list of receivers
                                            subject: 'Hay nuevos paquetes por atender', // Subject line
                                            text: `Por favor ingresa al portal http://${hostname}/de_login`
                                        };
                                        mailer.sendEmail(mailOptions);
                                    }
                                    
                                });

                                res.redirect('/thankyou/' + numorder );
                            }
                          });
                          //cb( 0,'Se actualizó el estatus del pedido', href);
                      }
                    });
              }
            });
        }
        else
        {
            req.session.message = 'No se encontró un pedido para el id de pago: ';
            res.redirect( '/error' );
        }
     }
  });
};

function cancel (req, res){
  //console.log(req.body);
  //console.log(req.query);
  var paymentId = req.body.paymentId;
  var payer_id = req.body.PayerID; 
  var execute_payment_json = {
        "payer_id": payer_id
  };
  // todo: adaptar esta línea ya que es una app móvil
  res.redirect( '/cancelpayment' );
};



module.exports = {
    payment: payment,
    cancel: cancel
};
