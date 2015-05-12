/*
 * Notes taken from "Rapid Protoyping with JS" epub p.128-129 and review 6.1.2 Node.js Core Modules
 * 
 * Node.js Core Modules
 * There is no need to install or download core modules. To include them in your application, all you 
 * need is to follow the syntax: var http = require ( 'http' );
 * 
 * The main core modules, classes, methods and events include:
 * http, util, querystring, url, fs
 * 
 * http - This is the main module responsible for Node.js HTTP server. Here are the main methods: 
 * http.createServer() : returns a new web server object 
 * http.listen() : begins accepting connections on the specified port and hostname 
 * http.createClient() : node app can be a client and make requests to other servers 
 * http.ServerRequest() : incoming requests are passed to request handlers 
 *      data : emitted when a piece of the message body is received 
 *      end : emitted exactly once for each request 
 *      request.method() : the request method as a string 
 *      request.url() : request URL string 
 * http.ServerResponse() : this object is created internally by an HTTP server — not by the user, and 
 * used as an output of request handlers 
 *      response.writeHead() : sends a response header to the request 
 *      response.write() : sends a response body * response.end() : sends and ends a response body
 * 
 * util - This module provides utilities for debugging. Some of the methods include:
 * util.inspect(); Return a string representation of an object, which is useful for debugging
 * 
 * querystring - This module provides utilities for dealing with query strings. Some of the methods include:
 * querystring.stringify() : Serialize an object to a query string 
 * querystring.parse() : Deserialize a query string to an object
 * 
 * url - This module has utilities for URL resolution and parsing. Some of the methods include:
 * parse() : Take a URL string, and return an object
 * 
 * fs - fs handles file system operations such as reading and writing to/from files. There are synchronous and 
 * asynchronous methods in the library. Some of the methods include:
 * fs.readFile() : reads file asynchronously 
 * fs.writeFile() : writes data to file asynchronously
 * 
 * many more core modules shown here: https://nodejs.org/api/
*/