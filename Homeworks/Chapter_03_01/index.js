/**
 * @author François Houlbrèque
 * @description Node HTTP RESTful API Hello World!
 *
 **/

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// HTTP Server Instantiation
let httpServer = http.createServer((req, res) => serverLogic(req, res));

// HTTP Server Start
httpServer.listen(3000, () => {
  console.log(
    '-------------------------------------------------------------------\n' +
    'The HTTP server is running on port 3000 \n' +
    '-------------------------------------------------------------------'
  )
});

// All the server logic is going into here
let serverLogic = (req, res) => {

  // Parse the URL requested
  let reqUrl = url.parse(req.url, true);

  // Requested from IP
  let reqIP = req.connection.remoteAddress;

  // Get the requested path (removing trailing /)
  let reqPath = reqUrl.pathname;
  let reqTrimPath = reqPath.replace(/^\/+|\/+$/g, '');

  // Get the query string (object)
  let reqQueryStr = reqUrl.query;

  // Get the HTTP method of the request
  let reqHttpMethod = req.method.toLowerCase();

  // Get the request Headers (object)
  let reqHeaders = req.headers;

  // Get the request payload if exists
  let decoder = new StringDecoder('utf-8');
  let reqBuffer = '';

  // - Intercept .data event
  req.on('data', (data) => reqBuffer += decoder.write(data));

  // - Intercept end of payload event and process the request
  req.on('end', () => {
    reqBuffer += decoder.end();

    // Check if the route exists or return 404 not found
    let chosenRoute = typeof(router[reqTrimPath]) !== 'undefined' ? router[reqTrimPath] : routes.notFound;

    // Data object to be handled by route methods
    let data = {
      'path': reqTrimPath,
      'query': reqQueryStr,
      'method': reqHttpMethod,
      'headers': reqHeaders,
      'payload': reqBuffer
    };

    // Route the request to the right method
    chosenRoute(data, (statusCode, payload) => {

      // Check if the status code is set or default it to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // Check the payload exists or default it to an empty object
      payload = typeof(payload) === 'object' ? payload : {};

      // Set the Content-Type as JSON
      res.setHeader('Content-Type', 'application/json');

      // Add the HTTP Status Code to the response
      res.writeHead(statusCode);

      // Add the payload as a JSON String
      res.end(JSON.stringify(payload));

      // Send to the console the response for debugging purpose
      console.log(
        'New request received from IP ' + reqIP + '\n' +
        'Path:   ' + reqPath + '\n' +
        'Method: ' + reqHttpMethod + '\n' +
        'Data:\n', data,
        '\nResponse Code: ' + statusCode + '\n' +
        'Payload:\n', payload,
        '\n-------------------------------------------------------------------'
      )
    });
  });
};

/*
 * ----------------------------------------
 * *                ROUTES                *
 * ----------------------------------------
 */

// Routes methods initialisation
let routes = {};

// Routes methods
routes.hello = (data, callback) => {
  let name = typeof(data.query.name) !== 'undefined' ? data.query.name : false;
  let message = name ? 'Hello, ' +name+ '!' : 'Hello, World!';
  callback(
    200,
    {
      'message': message
    }
  )
};

// Not found method
routes.notFound = (data, callback) => {
  callback(
    404,
    {
      'message': 'Path not found, try /hello',
      'error': true
    }
  )
};

// Router (route linking)
let router = {
  'hello': routes.hello
};


