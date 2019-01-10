/**
 * Utils for email.
 *
 * @author    Johnny Yankee {@link http://JohnnyYankee.com}
 * @copyright Copyright (c) 2019, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';
var nodemailer = require('nodemailer');
var transporter = require('nodemailer-smtp-transport');
console.log(process.env.MAIL_SENDER);
var mailSender = JSON.parse(process.env.MAIL_SENDER);
var transporter = nodemailer.createTransport(transporter({
    host : mailSender.host,
    ignoreTLS : mailSender.ignoreTLS,
    secureConnection : mailSender.secureConnection,
    port: mailSender.port,
    auth : {
        user : mailSender.user,
        pass : mailSender.pass
    }
}));  

function sendEmail(emailOptions){
	transporter.sendMail(emailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};

exports.sendEmail = sendEmail;