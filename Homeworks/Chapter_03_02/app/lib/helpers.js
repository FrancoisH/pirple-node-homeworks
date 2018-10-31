/**
 * Helpers Module
 * @author       François Houlbrèque
 * @description  Various helpers for the application
 */


/** Module Container */
helpers = {};


/**
 * @function     parseJTO
 * @description  Parse JSON String to an Object. Avoid error throwing
 */
helpers.parseJTO = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

/** Module Export */
module.exports = helpers;