/*
 * For the step-by-step tutorial, go to Chat REST API (memory store) in manual. 
 * The source code is at http://bit.ly/1usviBi. 
 * 
 * To test the server, you can use CURL command: 
 * $ curl http://127.0.0.1:1337 
 * 
 * To see list of messages:
 * $ curl localhost:1337/messages/list.json
 * 
 * To add new messages:
 * $ curl -X POST -d 'name=sosana&message=waz up' http://127.0.0.1:1337/messages/create.json 
 * 
 * To check if messages worked
 * $ curl localhost:1337/messages/list.json
 * 
 * CURL is also available for Windows at http://curl.haxx.se/download.html. 
 * 
 * The UI/browser app for the Chat is in this folder: https://github.com/azat-co/rpjs/tree/master/backbone.
 * 
 * Please keep in mind that, this is a very simplified comparison of strings and not JavaScript objects. 
 * So every space, quote and case matters. You could make the comparison “smarter” by parsing a string
 * into a JSON object with: JSON.parse(str);
 * 
 * NOTE: Generally, fixtures like dummy data belong to the test/spec files and not to the main
 * application codebase.
 * 
*/

// loads http module
var http = require('http');
// usefull functions
var util= require('util');
// loads querystring module, we'll need it to serialize and deserialize objects and query strings
var querystring = require('querystring');

// this array will hold our messages
var messages=[];
// sample message to test list method
messages.push({
    "name":"John",
    "message":"hi"
});

// To create a server and expose it to outside modules (i.e., test.js):
exports.server = http.createServer(function (req, res) {
 
    // Inside of the request handler callback, we should check if the request method is POST and 
    // the URL is messages/create.json:
    if (req.method == "POST" && req.url == "/messages/create.json") {
        // If the condition above is true, we add a message to the array. However, data is type 
        // of Buffer, data must be converted to a string type (with encoding UTF-8) prior to the 
        // adding, because it is a type of Buffer:
        var message='';
        req.on('data', function(data, msg) {
            console.log(data.toString('utf-8'));
            message = exports.addMessage(data.toString('utf-8'));
        })
    
        req.on('end', function() {
            // These logs will help us to monitor the server activity in the terminal:
            console.log('message', util.inspect(message, true, null));
            // debugging output into the terminal
            console.log('messages:', util.inspect(messages, true, null));
            // The output should be in a text format with a status of 200 (okay):
            // sets the right header and status code
            res.writeHead(200, {'Content-Type': 'text/plain'});
            // We output a message with a newly created object ID:
            res.end(message);
        })
        
    } else {
        // If the method is GET and the URL is /messages/list.json output a list of messages:
        if (req.method == "GET" && req.url == "/messages/list.json") {
            // Fetch a list of messages. Body will hold our output:
            var body = exports.getMessages();
            // The response body will hold our output:
            res.writeHead(200, {
                'Content-Length': body.length,
                'Content-Type': 'text/plain'
            });
            res.end(body);
        } else {
            // sets the right header and status code  
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello World\n');
    }
    };
    // In case it’s neither of the two endpoints above, we output a string with a line-end symbol: 
    console.log(req.method);
// Now, we should set a port and IP address of the server:  
}).listen(process.env.PORT || 1337);

console.log('Server running at http://127.0.0.1:1337/');

// method to get the list of the messages for chat 
// We expose methods for the unit testing in test.js (exports keyword), and this function returns 
// an array of messages as a string/text:
exports.getMessages = function() {
    // output array of messages as a string/text
    return JSON.stringify(messages);
};

// method to add a new message to the chat collection
exports.addMessage = function (data){
    // to convert string into JavaScript object we use parse/deserializer
    messages.push(querystring.parse(data));
    // output new message in JSON as a string
    return JSON.stringify(querystring.parse(data));
};