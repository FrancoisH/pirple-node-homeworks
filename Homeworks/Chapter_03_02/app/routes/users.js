/**
 * Users Module
 * @author       François Houlbrèque
 * @description  Users API routes handlers
 */

/** Dependencies */
const validation = require('../lib/validation');

/**
 * Allowed Users methods
 * Accepts:  POST, GET, PUT, DELETE
 */
const userMethods = ['post', 'get', 'put', 'delete'];

/** Redirect to the right handler */
let users = (reqData, callback) => {
  if (userMethods.indexOf(reqData.method) > -1) {
    _users[reqData.method](reqData, callback);
  } else {
    callback(405, {'error': 'Method not allowed'});
  }
};

/** Method routines container */
const _users = {};

/**
 * @function     post
 * @description  Handle the POST method
 *               Create a user and hashes it's password
 */
_users.post = (reqData, callback) => {
  let firstName = validation.string(reqData.payload.firstName, 3, 20);

  if (firstName.result) {
    callback(200, {firstName: firstName});
  } else {
    callback(400, {error: firstName.error});
  }
};
/** Module Export */
module.exports = users;