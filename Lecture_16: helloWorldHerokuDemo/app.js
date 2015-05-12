/*
 * Hello World Server
 * Go to "Rapid Protoyping with JS" epub p.128-129 and review 6.1.2 Node.js Core Modules
 * or look at notes folder cor coreModuleNotes.js
*/

//  This will load the core "http" module for the server 
var http = require('http');
// We’ll need a port number for our Node.js server. To get it from the environment, or assign 
// 3000 if the environment is not set, use:
var port = process.env.PORT || 3000;
// This will create a server and a call-back function will contain the response handler code:
var server = http.createServer(function(request, response) {
    // To set the right header and status code, use:
    response.setHeader('Content-Type', 'text/plain'),
    // To output “Hello World” with the line end symbol, use:
    response.end('Hello World');
});

server.listen(port, function() {
    console.log("Server Listening on Port " + port);
});

