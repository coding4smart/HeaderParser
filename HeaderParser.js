/*
 * Request Header Parser Microservice,
 *
 * tangjicheng@gmail.com
 *
 * accepts a request url and parse the header to get:
 * clint ip address:(expample:127.0.0.1)
 * language:(ex:en-US)
 * os:(ex:Macintosh; Intel Mac OS X 10_11_6)
 *
 * returns { "ipaddress": 127.0.0.1, "language": "December 15, 2015", "software": "Macintosh; Intel Mac OS X 10_11_6" }.
 *
 */
var express = require('express');
var app = express();
var http = require('http');

var header = {};

app.get("/api/whoru", function (request, response) {
  
  var browser = request.header('user-agent');
  var os = browser.substring(browser.indexOf("(")+1,browser.indexOf(")"));
  var language = request.header('accept-language').split(',')[0];
  var ip = request.header('x-forwarded-for').split(',')[0];
  header = {"ipaddress":ip,"language":language,"software":os};
  response.send(JSON.stringify(header));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
 console.log('Your app is listening on port ' + listener.address().port);
});
