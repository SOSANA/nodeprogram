/*
 * github https://github.com/azat-co/rpjs/tree/master/mongo
 *  
 * To test via CURL terminal commands and see list of messages run: 
 * $ curl http://localhost:3000/messages/list.json 
 * 
 * NOTE: Will return empty array
 * 
 * POST a new message:
 * $ curl -d "username=BOB&message=test" http://localhost:3000/messages/create.json 
 * 
 * To add new messages:
 * $ curl -X POST -d 'name=sosana&message=waz up' http://localhost:3000/messages/create.json 
 * 
 * To check if messages worked
 * $ curl localhost:3000/messages/list.json
 * 
*/

// first we include our libraries
var http = require('http');
var util = require('util');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

// make a string to connect to MongoDB:
var host = "mongodb://localhost/test";

// We put all the logic inside of an open connection in the form of a callback function:
mongo.connect(host, function(error, db) {
    console.log("this is working");
    if (error) throw error;

    // establish a connection to the database
    var myDB = db.db("test");

    // establish a connection to the collection 
    var collection =  myDB.collection("messages");

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
                collection.insert(querystring.parse(
                    data.toString('utf-8')), 
                    {safe:true}, 
                    function(error, obj) {
                    if (error) throw error;
                    response.end(JSON.stringify(obj));
                    })              
        })
    };
});

    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log("listening on port " + port);
})