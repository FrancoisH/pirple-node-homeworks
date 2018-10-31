/**
 * Validation related utilities
 */


/** Module container */
validation = {};


/**
 * @function     string
 * @description  Trim and validate string text field
 *               Does arbitrary accept '.- and in middle space to allow name using those signs
 *               and accepts all accented characters (Unicode)
 * @param        {String}  str      String to validate
 * @param        {Number}  minL     Minimum string length
 * @param        {Number}  maxL     Maximum string length
 * @param        {String}  sanitize Filter the string, default to alphaNum, accepts none or alpha
 */
validation.string = (str, minL = 1, maxL = 50, sanitize = 'alphaNum') => {
  /**
   * Does arbitrary accept '.- and in middle space to allow name using those signs
   * and accepts all accented characters (Unicode). Remove everything else.
   */

  /** alpha RegEx: https://regex101.com/r/TndFhN/2 */
  const rxpAlpha = /[^a-zA-ZÀ-ù\s'.-]*/umg;

  /** alphaNum RegEx : https://regex101.com/r/FI8m2R/7 */
  const rxpAlphaNum = /[^a-zA-ZÀ-ù0-9\s'.-]*/umg;

  /** Validation object initialisation */
  let eval = {
    'str'     : false,
    'minL'    : false,
    'maxL'    : false,
    'sanitize': false,
    'valid'   : false,
  };


  /** Perform all the test */
  if (str && str.trim().length > 0) {
    /** Trim the string */
    str = str.trim();
    eval.str = true; // String is present and not empty
    if (str.length >= minL && minL >= 0) {
      eval.minL = true; // String satisfy the minimum length requirement
      if (str.length <= maxL && maxL >= 1) {
        eval.maxL = true; // String satisfy the maximum length requirement
        if (['none', 'alpha', 'alphaNum'].indexOf(sanitize) === -1) sanitize = 'alphaNum';
        switch (sanitize) {
          case 'alpha':
            str = str.replace(rxpAlpha, '').trim();
            eval.sanitize = 'alpha'; // Sanitized to only alpha characters
            break;
          case 'alphaNum':
            str = str.replace(rxpAlphaNum, '').trim();
            eval.sanitize = 'alphaNum'; // Sanitized to only alpha-numerical characters
            break;
          default:
            eval.sanitize = 'none'; // Not sanitized
        }
        if (str.length >= minL && str.length <= maxL) {
          eval.valid = true; // Size still valid after sanitation
        }
      }
    }
  }

  /** Result and error message */
  if (!eval.str) {
    return {result: false, error: 'Empty string'};
  } else if (!eval.minL) {
    return {result: false, error: 'The string length is below '+minL+' character(s)'};
  } else if (!eval.maxL) {
    return {result: false, error: 'The string length is above '+maxL+' character(s)'};
  } else if (!eval.valid) {
    return {result: false, error: 'After filtering, the given string is invalid'};
  } else return {result: str};
};

/** Module export */
module.exports = validation;