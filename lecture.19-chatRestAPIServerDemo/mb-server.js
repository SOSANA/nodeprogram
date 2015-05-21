/*
 * Refer to PDF manual section "Chat REST API Server (Memory Store)"
 * Please keep in mind that, this is a very simplified comparison of strings and not JavaScript objects. 
 * So every space, quote and case matters. You could make the comparison “smarter” by parsing a string
 * into a JSON object with: JSON.parse(str);
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

// creates server
exports.server = http.createServer(function (req, res) {
 
    // if method is POST and URL is messages/ add message to the array
    if (req.method == "POST" && req.url == "/messages/create.json") {
        // data is type of Buffer and must be converted to string with encoding UTF-8 first
        // adds message to the array
        var message='';
        req.on('data', function(data, msg){
        console.log(data.toString('utf-8'));
        message=exports.addMessage(data.toString('utf-8'));  
        })
    req.on('end', function(){
        console.log('message', util.inspect(message, true, null));
        // debugging output into the terminal
        console.log('messages:', util.inspect(messages, true, null));
        // sets the right header and status code
        res.writeHead(200, {'Content-Type': 'text/plain'});
        // out put message, should add object id
        res.end(message);
        })
    } else
        // if method is GET and URL is /messages output list of messages
        if (req.method == "GET" && req.url == "/messages/list.json") {
        // body will hold our output
        var body = exports.getMessages();
   
        res.writeHead(200, {
            'Content-Length': body.length,
            'Content-Type': 'text/plain'
        });
        res.end(body);
    } else {
        // sets the right header and status code  
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    };
    // outputs string with line end symbol  
    console.log(req.method);
// sets port and IP address of the server  
}).listen(process.env.PORT || 1337);

console.log('Server running at http://127.0.0.1:1337/');

exports.getMessages = function() {
    // output array of messages as a string/text
    return JSON.stringify(messages);
};

exports.addMessage = function (data){
    // to convert string into JavaScript object we use parse/deserializer
    messages.push(querystring.parse(data));
    // output new message in JSON as a string
    return JSON.stringify(querystring.parse(data));
};