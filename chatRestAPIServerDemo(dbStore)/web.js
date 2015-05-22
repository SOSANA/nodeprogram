/*
 * github https://github.com/azat-co/rpjs/tree/master/mongo
 * 
*/

// first we include our libraries
var http = require('http');
var util = require('util');
var querystring = require('querystring');
var mongo = require('mongodb');

// make a string to connect to MongoDB:
var host = "mongodb://@127.0.0.1:27017/test";

// We put all the logic inside of an open connection in the form of a callback function:
mongo.Db.connect(host, function(error, client) {
    console.log("this is working");
	if (error) throw error;
	
    var collection = new mongo.Collection(client, 'messages');
	
    var app = http.createServer( function (request, response) {
	
        if (request.method === "GET" && request.url === "/messages/list.json") {
			collection.find().toArray(function(error,results) {
				response.writeHead(200,{'Content-Type':'text/plain'});
				console.dir(results);
				response.end(JSON.stringify(results));
			});
		};
		
        if (request.method === "POST" && request.url === "/messages/create.json") {
			request.on('data', function(data) {
				collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {
					if (error) throw error;
					response.end(JSON.stringify(obj));
			})				
		})
	};
});

    var port = process.env.PORT || 3000;
	app.listen(port);
})