var paypal = require('paypal-rest-sdk');

var MODE_PAYPAL = process.env.MODE_PAYPAL || 'sandbox';
var CLIENT_ID_PAYPAL = process.env.CLIENT_ID_PAYPAL || 'AcF4GRqVpVBcdcmTSv-VJV3atX7nmF-VRekmP1HcfiLl2MjpuY_rZRlAW3DOsvzkfXuY-fAR2eoq29Hu';
var CLIENT_SECRET_PAYPAL = process.env.CLIENT_SECRET_PAYPAL|| 'ENLjgr2YzyBGvTEpd5blrjlwYZW4Jl3D-4yLcdLEHqIM2dtgwdRSxoKwEud-u7PGoGaP3IpWg7z6bglZ';
var RETURN_URL_PAYPAL = process.env.RETURN_URL_PAYPAL || 'http://apptd.herokuap.com/paypal/payment';
var CANCEL_URL_PAYPAL = process.env.CANCEL_URL_PAYPAL || 'http://apptd.herokuap.com/paypal/cancel';

paypal.configure({
    'mode': MODE_PAYPAL , //sandbox or live
    'client_id': CLIENT_ID_PAYPAL,
    'client_secret': CLIENT_SECRET_PAYPAL,
    'headers' : {
		'custom': 'header'
    },
    'urls':{
        'payment_url': RETURN_URL_PAYPAL,
        'cancel_url': CANCEL_URL_PAYPAL
    },
});