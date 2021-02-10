/*
    Name: get-jokes.php
    Description: Returns an array of random jokes in JSON format
    Author: Oliver Hindman
    Last Modified: 1/25/2021
    Example usage: get-jokes.php?limit=3
*/

const jokesq = ['What do you call a very small valentine? A valen-tiny!', 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!', "Why don't sharks like to eat clowns? Because they taste funny!", "What did the boy cat say to the girl cat? You're Purr-fect!", "What is a frog's favorite outdoor sport? Fly Fishing!", 'Did you hear about the cheese factory that exploded in France? Theyre the wurst.', 'Our wedding was so beautiful. Even the cake was in tiers.', 'Is this pool safe for diving? It deep ends.', 'Dad, can you put my shoes on? I dont think theyll fit me.'];

const http = require('http');

const url = require('url');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const indexPage = `
<html>
  <head>
    <title>Random Joke Web Service</title>
  </head>
  <body>
    <h1>Random Joke Web Service</h1>
    <p>
      Random Joke Web Service - the endpoint is here --> 
      <a href="/random-joke">random-joke</a> or <a href="/random-joke?max=10">random-joke?max=10</a>
    </p>
  </body>
</html>`;

const errorPage = `
<html>
  <head>
    <title>404 - File Not Found</title>
  </head>
  <body>
    <h1>404 - File Not Found</h1>
    <p>
     Check your URL, or your typing!!
    </p>
  </body>
</html>`;

const getRandomJokeJSON = (max = 1) => {
  const number = Math.floor(Math.random() * 11);
  const responseObj = {
    timestamp: new Date(),
    number,
  };
  return JSON.stringify(responseObj);
};

const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  console.log('parsedUrl=', parsedUrl);
  console.log('pathname=', pathname);

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(indexPage);
    response.end();
  } else if (pathname === '/random-joke') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokeJSON());
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
