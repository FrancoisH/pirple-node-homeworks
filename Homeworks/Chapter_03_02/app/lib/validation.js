/**
 * Validation related utilities
 */


/** Module container */
validation = {};


/**
 * @function     string
 * @description  Trim and validate string text field
 * @param        {String}  str       String to validate
 * @param        {Number}  minL      Minimum string length
 * @param        {Number}  maxL      Maximum string length
 * @param        {String}  sanitize  Sanitize the string, default to none, accepts name, address, text.
 *                                   Does arbitrary accept '.- and in middle space to allow name using those signs
 *                                   and accepts all accented characters (Unicode). Remove everything else.
 */
validation.string = (str, minL = 1, maxL = 50, sanitize = 'none') => {

  /** Regex repository initialization */
  const filters = {};

  filters.name    = /[^a-zA-ZÀ-ù\s'.-]*/umg;
  filters.address = /[^a-zA-ZÀ-ù0-9\s'.,-]*/umg;

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
    if (str.length >= minL && minL > 0) {
      eval.minL = true; // String satisfy the minimum length requirement
      if (str.length <= maxL && maxL > 0) {
        eval.maxL = true; // String satisfy the maximum length requirement
        if (['none', 'name', 'address', 'text'].indexOf(sanitize) === -1) sanitize = 'none';
        switch (sanitize) {
          case 'name':
            str = str.replace(filters.name, '').trim();
            eval.sanitize = 'alpha'; // Sanitized to only alpha characters
            break;
          case 'address':
            str = str.replace(filters.address, '').trim();
            eval.sanitize = 'alphaNum'; // Sanitized to only alpha-numerical characters
            break;
          default:
            eval.sanitize = 'none'; // Not sanitized
        }
        if (str.trim().length >= minL && str.trim().length <= maxL) {
          str = str.trim();
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
    return {result: false, error: 'After filtering, the given string is invalid (string with only invalid characters)'};
  } else return {result: str};
};


/**
 * @function     zip
 * @description  Trim and validate zip code
 * @param        {String}  str       String to validate
 * @param        {String}  country   Country specific rules, default to 'intl'
 */
validation.zip = (str, country = 'intl') => {
  /** Regex zip repository */
  let filters = {};
  filters.intl = {};
  filters.intl.check    = /[^a-zA-ZÀ-ù0-9\s'.,-]*/umg;
  filters.fr = {};
  filters.fr.sanitize   = /(?<=[0-9]{5})([0-9]*)/umg;
  filters.fr.check      = /[0-9]{5}/umg;
  filters.fr.msg        = '5 numbers without space';

};

/** Module export */
module.exports = validation;