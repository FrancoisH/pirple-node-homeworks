/**
 * Errors Module
 * @author       François Houlbrèque
 * @description  Error API routes handlers
 */


/** Module container */
const errors = {};


/**
 * @function     notFound
 * @description  Only generate 404 response
 */
errors.notFound = (reqData, callback) => {
  callback(404, {'error': 'This API endpoint does not exists'});
};

/** Module Export */
module.exports = errors;