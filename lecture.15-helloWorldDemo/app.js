var http = require('http');
var port = process.env.PORT || 3000;

var server = http.createServer(function(request, response) {
    response.setHeader('Content-Type', 'text/plain'),
    response.end('Hello World');
});

server.listen(port);
console.log("Server Listening on Port 3000");