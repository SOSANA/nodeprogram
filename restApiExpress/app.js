/*
 * node program manual p.59 | github source code: https://github.com/azat-co/rest-api-express
 * 
 * Mongoskin
 * a MongoDB library which is a better alternative to the plain, good old native MongoDB driver
 * for Node.js. In addition, Mongoskin is more lightweight than Mongoose and schema-less. For more insight, 
 * please check out Mongoskin comparison blurb.
 * 
 * Express.js
 * is a wrapper for the core Node.js HTTP module objects. The Express.js framework is built on top of Connect
 * middleware and provides tons of convenience. In version 4.x the middlewares are not bundled with the framework!
 * Developers have to install separate modules, except for express.static, Express.js 4.x. So to parse incoming 
 * information, we add body-parser.
 * 
 * CURL data to make a POST request:
 * $ curl -X POST -d "name=sosana" http://localhost:3000/collections/test13
 * 
 * Check this object either by using our REST API server:
 * $ curl http://localhost:3000/collections/test13
 * 
 * GET requests also work in the browser. For example, open this link while your local server is running on port 3000 
 * http://localhost:3000/collections/test13. Or if we don’t trust server results (why wouldn’t we? but let’s pretend 
 * we don’t), we can open MongoDB shell ($ mongo) and type: > db.test13.find()
 * 
 * 
 * 
*/

// this line will give us a server object:
var express = require('express'),
    // lightweight ODM
    mongoskin = require('mongoskin'),
    // parses incoming information
    bodyParser = require('body-parser')
    logger = require('morgan');

// Express.js streamlines the instantiation of its app instance:
var app = express();
    // To extract params from the body of the requests, we’ll use bodyParser() middleware which looks more 
    // like a configuration statement:
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(logger('dev'));

// connect to the MongoDB database:
// Note: If you wish to connect to a remote database, e.g., MongoHQ instance, substitute the
// string with your username, password, host and port values. 
var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true});

// The app.param() method is another Express.js middleware. It basically says “do something every
// time there is this value in the URL pattern of the request handler”. In our case, we select a particular
// collection when request pattern contains a sting collectionName prefixed with a colon (you’ll see it
// later in the routes). Then, we save that collection as a property (collection but could be anything)
// of the request object (widespread req), which will be available in the next request handlers:
app.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName);
    return next();
});

// Merely to be user-friendly, let’s put a root route with a message:
app.get('/', function(req, res, next) {
    res.send('please select a collection, e.g., /collections/messages')
});

// Now the real work begins, here is how we retrieve a list of any items (first parameter is an empty
// object {} which means any). The results will be capped at a limit of 10 and sorted by _id (second
// parameter). The find() method returns a cursor, so we call toArray() to get the JavaScript/Node.js array:
app.get('/collections/:collectionName', function(req, res, next) {
    req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
        if (e) return next(e);
        res.send(results);
    })
});

// Have you noticed a :collectionName string in the URL pattern parameter? This and the previous app.param() 
// middleware is what gives us the req.collection object, which points to a specified collection in our database.
// The object creating endpoint is slightly easier to grasp since we just pass the whole payload to the MongoDB. 
// This method often called free JSON REST API because server and then the database accept any data structure. 
// Parse.com and other Back-end as a Service providers pioneered the free JSON approach. In our Express.js app, 
// we use req.body for this:
app.post('/collections/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
        if (e) return next(e);
        res.send(results);
    })
});

// Single object retrieval functions like findById and findOne are faster than find(), but they use a different 
// interface (they return the object directly instead of a cursor). So please be aware of that. In addition, we’re 
// extracting the ID from :id part of the path with req.params.id Express.js magic:
app.get('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result){
        if (e) return next(e);
        res.send(result);
    })
});

// PUT request handler gets more interesting because update() doesn’t return the augmented object. Instead it returns 
// us a count of affected objects. Also {$set:req.body} is a special MongoDB operator (operators tend to start with a 
// dollar sign) that sets values. The second ‘ {safe:true, multi:false}‘ parameter is an object with options that tell 
// MongoDB to wait for the execution before running the callback function and to process only one (first) item.
app.put('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function(e, result){
        if (e) return next(e);
        res.send((result === 1) ? {msg:'success'} : {msg: 'error'});
    })
});

// Finally, the DELETE HTTP method is processed by app.del(). In the request handler, we utilize removeById() which does 
// exactly what it sounds like it should do, and takes an ID and a callback. Then, we output a custom JSON message success 
// on the deletion:
app.delete('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result){
        if (e) return next(e);
        res.send((result === 1)?{msg: 'success'} : {msg: 'error'});
    })
});

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
});

