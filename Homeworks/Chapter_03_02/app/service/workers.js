/**
 * Workers Module
 * @author      François Houlbrèque
 * @description Define all the background workers of the app
 */


/** Dependencies */



/** Module container */
const workers = {};


/**
 * @function     init
 * @description  Instantiate background workers
 */
workers.init = () => {
  console.log(
    '[\x1b[32mSTART\x1b[39m] Background tasks'
  );
};

/** Export the module */
module.exports = workers;