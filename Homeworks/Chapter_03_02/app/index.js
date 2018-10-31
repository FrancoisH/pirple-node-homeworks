/**
 * --------------------------------------
 * Pizza delivery app API - Main app file
 * --------------------------------------
 * @author      François Houlbrèque
 * @description Identify users, allows customers to order pizzas, to pay the pizzas through Stripe,
 *              to get a receipt from Mailgun
 */

/** Imports */
const config  = require('./config');
const server  = require('./service/server');
const workers = require('./service/workers');




/** app container */
const app = {};

/** @function     init
 *  @description  Instantiate the app
 */
app.init = () => {
  /** Output starting of the app to the console */
  console.log(
      '---------------------------------------------\n'
    + '*            \x1b[1mPizza Delivery App\x1b[22m             *\n'
    + '*     Current environment : '+config.env+'      *\n'
    + '---------------------------------------------'
  );

  /** Instantiate background workers */
  workers.init();

  /** Instantiate server */
  server.init();
};

/** App initialisation */
app.init();



/** Export the app */
module.exports = app;