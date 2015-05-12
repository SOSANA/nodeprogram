/*
 * Hellow World Server
 * Got to Rapid Protoyping with JS epub p.128-129 and review 6.1.2 Node.js Core Modules
 * 
*/

var http = require('http');
var port = process.env.PORT || 3000;

var server = http.createServer(function(request, response) {
    response.setHeader('Content-Type', 'text/plain'),
    response.end('Hello World');
});

server.listen(port);
console.log("Server Listening on Port 3000");