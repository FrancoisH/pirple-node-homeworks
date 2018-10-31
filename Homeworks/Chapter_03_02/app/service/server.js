/**
 * Server Module
 * @author       François Houlbrèque
 * @description  Instantiate both HTTP and HTTPS servers
 */


/** Dependencies */
const config = require('../config');
const helpers = require('../lib/helpers');
const http = require('http');
const https = require('https');
const util = require('util');
const StrDec = require('string_decoder').StringDecoder;
const url = require('url');

/** Route handlers */
const errors = require('../routes/errors');
const users   = require('../routes/users');

/** Init Debug tool */
const debug = util.debuglog('server');

/** Module Container */
const server = {};

/**
 * @function     httpSrv
 * @description  Define the HTTP Service
 */
server.httpSrv = http.createServer((req, res) => {
  /** Use configuration routine */
  server.configRoutine(req, res);
});

/**
 * @function     httpsSrv
 * @description  Define the HTTPS Service
 */
server.httpsSrv = https.createServer(config.ssl, (req, res) => {
  /** Use configuration routine */
  server.configRoutine(req, res);
});

/**
 * @function     configRoutine
 * @param        {Object} req   Request object
 * @param        {Object} res   Response object
 * @description  Set all the common tasks for both HTTP and HTTPS servers
 */
server.configRoutine = (req, res) => {
  /** @var reqUrl      {Object} Parsed requested URL */
  let reqUrl = url.parse(req.url, true);

  /** @var reqPath     {String} Parsed requested path */
  let reqPath = reqUrl.pathname.replace(/^\/+|\/+$/g, '');

  /** @var reqQuery    {Object} Parsed query string*/
  let reqQuery = reqUrl.query;

  /** @var reqMethod   {String} Request method (lower case) */
  let reqMethod = req.method.toLowerCase();

  /** @var reqHead     {Object} Request headers */
  let reqHead = req.headers;

  /** @var reqPyld     Decoded buffer (UTF-8)*/
  let decoder = new StrDec('utf-8');
  let reqPyld = '';

  /** @event data      Listen on the data stream start and write buffer */
  req.on('data', (data) => reqPyld += decoder.write(data));
  /** @event end       Listen on the data stream end then process the request */
  req.on('end', () => {
    /** End the decoding */
    reqPyld += decoder.end();

    /** @var chosenRoute {Function} Chosen route or return 404 error */
    let chosenRoute = typeof(server.routes[reqPath]) !== 'undefined'
      ? server.routes[reqPath]
      : errors.notFound;

    /** @var reqData {Object} Data to send to the route handler */
    let reqData = {
      'path': reqPath,
      'query': reqQuery,
      'method': reqMethod,
      'headers': reqHead,
      'payload': helpers.parseJTO(reqPyld)
    };

    chosenRoute(reqData, (statusCode = 200, payload = {}) => {
      /** Convert the payload to a String */
      let pyldStr = JSON.stringify(payload);

      /** Factor the response */
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(pyldStr);

      /** Send debug information in green if 200, otherwise red */
      let debugClr = statusCode === 200 ? '\x1b[32m' : '\x1b[31m';
      debug('[' + debugClr + statusCode + '\x1b[39m] ', reqMethod.toUpperCase() + ' /' + reqPath);
    });
  });
};


/** @var routes   {Object} Application routes */
server.routes = {
//  'auth':  auth,
//  'cart':  cart,
  users: users,
//  'pay':   pay
};


/**
 * @function     init
 * @description  Instantiate server
 */
server.init = () => {
  /** Start the HTTP Server */
  server.httpSrv.listen(config.httpPort, () => {
    console.log(
      '[\x1b[32mSTART\x1b[39m] HTTP  Server listening on port [\x1b[36m' + config.httpPort + '\x1b[39m]'
    );
  });

  /** Start the HTTPS Server */
  server.httpsSrv.listen(config.httpsPort, () => {
    console.log(
      '[\x1b[32mSTART\x1b[39m] HTTPS Server listening on port [\x1b[36m' + config.httpsPort + '\x1b[39m]'
    );
  });
};


/** Module Export */
module.exports = server;
