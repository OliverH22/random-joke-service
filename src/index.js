console.log('First web service starting up ...');

const name = 'fred';
const car = {
  make: 'Ford',

};

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');
const jsonHandler2 = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': jsonHandler2.getHTMLResponse,
  '/random-Joke': jsonHandler.getRandomJokeResponse,
  notFound: jsonHandler2.getErrorResponse,
};

const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  const params = query.parse(parsedUrl.query);

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  // if(pathname === '/random-joke'){
  //   jsonHandler.getRandomJokeResponse(request, response);
  // }else{
  //   jsonHandler2.getErrorResponse(request,response)
  // }
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
