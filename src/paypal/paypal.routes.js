/**
 * PayPal routes.
 *
 * @author    Johnny Yankee {@link http://atomikhero.com}
 * @copyright Copyright (c) 2018, Johnny Yankee
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var paypal          = require('./paypal.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set PayPal routes.
 *
 * @param {Object} app The express application
 */
function setPayPalRoutes(app) {
        app.route('/paypal/return')
                .get(paypal.payment);
        app.route('/paypal/cancel')
                .get(paypal.cancel);

}

module.exports = setPayPalRoutes;








// function findUsers(user, cb){
  
//       User.find({'usertype':user.usertype, 'disabled': user.disabled},function(err, designers) {
//       // In case of any error return
//        if (err){
//          console.log('Error al consultar diseñadores');
//         cb(1, 'Error al consultar diseñadores');
//        }
//        else{
//     // already exists
//           if (designers.length > 0) {
//             //console.log('Se encontró el usuario');
//             //console.log(user);
//             cb( 0,'Se encontraron diseñadores', designers );
//           } 
//           else {
//             console.log( 'No se encontraron diseñadores' );
//               cb( 2, 'No se encontraron diseñadores' );
//           }
//        }
//     });
  
// }

// function getUserEmails(users){
//   var listEmails = '';
//   for (var i = 0; i < users.length; i++){
//     listEmails = listEmails + users[i].email;
//     if ( i < (users.length - 1)){
//       listEmails = listEmails + ',';
//     }
//   }
//   return listEmails;
// }

//module.exports = router;
