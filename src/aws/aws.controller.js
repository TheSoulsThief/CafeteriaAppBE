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
var logger = require('mm-node-logger')(module);
var Image  = require('./image.model.js');*/
var logger = require('mm-node-logger')(module);
var aws = require('aws-sdk');
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'doresuprueba';
aws.config.region = 'us-east-1';
/**
 * Crea una firma para poder subir una imagen a AWS S3.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {String} the sign of S3
 * @api public
 */
function signS3Upload(req, res) {
    const s3 = new aws.S3();
    // el nombre del folder llevar el id del usuario
    //var folder = req.user._id +'/' ;

    var folder = 'iduser0000001' +'/' ;
    
    // crea la carpeta para guardar las imágenes
    var params = { Bucket: S3_BUCKET_NAME, Key: folder, ACL: 'public-read', Body:'body does not matter' };
    s3.upload(params, function (err, data) {
    if (err) {
        console.log('Error creating the folder: ', err);
        } else {
        //console.log("Successfully created a folder on S3");
        }
    });
    // crea la carpeta para guardar las vistas en miniatura de las imágenes
    
    /*var params = { Bucket: S3_BUCKET_NAME_THUMB, Key: folder, ACL: 'public-read', Body:'body does not matter' };
    s3.upload(params, function (err, data) {
    if (err) {
        console.log("Error creating the folder thumbnail: ", err);
        } else {
        //console.log("Successfully created a thumbnail folder on S3");
  
        }
    });*/


    // al fileName se le agrega el folder para que la firma lo reconozca
    const fileName = req.user._id +'/' + req.query['filename'];
    const fileType = req.query['filetype'];
    // const s3Params = {
    //   Bucket: S3_BUCKET_NAME,
    //   Key: fileName,
    //   Expires: 10000,
    //   ContentType: fileType,
    //   ACL: 'public-read'
    // };
    var policy = require('s3-policy');
    var p = policy({
      //secret: process.env.AWS_SECRET_ACCESS_KEY,
      secret: 'UqLs3ptQ1INtRFaO6wOYsT8ffZ/bilzq77mKaHS3',
      length: 200000000,
      bucket: S3_BUCKET_NAME,
      key: fileName,
      ContentType: fileType,
      expires: new Date(Date.now() + 60000),
      acl: 'public-read'
    });
    //console.log(p.policy);
    //console.log(p.signature);
    var result = {
      //AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      AWSAccessKeyId: 'AKIAITLRBRM7EYUT46EA' ,
      key: fileName,
      policy: p.policy,
      signature: p.signature,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    };
    //console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(result));
    res.end();
  }

module.exports = {
    signS3Upload: signS3Upload
};
