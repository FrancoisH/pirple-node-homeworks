/**
 * Configuration module
 * @author       François Houlbrèque
 * @description  Pizza Delivery app configurations for different environment
 */

/** Dependencies */
const fs   = require('fs');
const path = require('path');

/** Configuration container */
const config = {};


/**
 * Staging environment config
 */
config.staging = {
  'env'        : '   staging',
  'httpPort'   : 3000,
  'httpsPort'  : 3001,
  'ssl'        : {
                    'cert': fs.readFileSync(path.join(__dirname,'./https/cert.pem')),
                    'key' : fs.readFileSync(path.join(__dirname,'./https/key.pem'))
                 },
  'secret'     : 'thisIsSecretHashingPhrase'
};

/**
 * Production environment config
 */
config.production = {
  'env'        : 'production',
  'httpPort'   : 5000,
  'httpsPort'  : 5001,
  'ssl'        : {
    'cert': fs.readFileSync(path.join(__dirname,'./https/cert.pem')),
    'key' : fs.readFileSync(path.join(__dirname,'./https/key.pem'))
  },
  'secret'     : 'thisIsSecretHashingProductionPhrase'
};

/** @var curEnv  Current environment*/
let curEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

/** @var      exportConfig  Return the current config object
 *  @default  staging environment
 */
let exportConfig = typeof(config[curEnv]) === 'object' ? config[curEnv] : config.staging;

/** Configuration export */
module.exports = exportConfig;