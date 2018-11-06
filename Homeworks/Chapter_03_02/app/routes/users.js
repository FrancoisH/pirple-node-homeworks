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
  /** Create user object */
  let userData = {
    firstName : validation.string(reqData.payload.firstName, 2, 20, 'name'),
    lastName  : validation.string(reqData.payload.lastName, 2, 30, 'name'),
    address1  : validation.string(reqData.payload.address1, 5, 50, 'address'),
    address2  : validation.string(reqData.payload.address2, 5, 50, 'address'),
    // zip       : validation.zip(reqData.payload.zip, 'intl),
    // phone     : validation.phone(reqData.payload.phone, 'intl'),
    // mail      : validation.mail(reqData.payload.mail),
    // password  : validation.password(reqData.payload.password, reqData.payload.passwordConf, 8, 16),
    // consent   : validation.boolean(reqData.payload.consent)
  };

  /** Create errors object */
  let errorsData = {};

  /** Check the user object and define final values or add error to the list */
  for (let key in userData) {
    if (!userData[key].result) {
      errorsData[key] = userData[key].error;
    } else {
      userData[key] = userData[key].result;
    }
  }

  /** Process if there's no error or return the errors if necessary */
  if(Object.keys(errorsData).length === 0) {
    callback(200, userData);
  } else {
    callback(400, {errors: errorsData});
  }
};

/** Module Export */
module.exports = users;