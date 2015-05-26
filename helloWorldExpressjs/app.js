/*
 * The req (request) and res (response) are the exact same objects that Node provides, 
 * so you can invoke req.pipe(), req.on('data', callback) and anything else you would 
 * do without Express involved.
 * 
 * The app starts a server and listens on port 3000 for connection. It will respond with
 *  “Hello World!” for requests to the homepage. For every other path, it will respond 
 * with a 404 Not Found.
 * 
*/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});