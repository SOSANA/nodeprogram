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

app.get('/', function(req, res, next) {
    res.send('please select a collection, e.g., /collections/messages')
});

app.get('/collections/:collectionName', function(req, res, next) {
    req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
        if (e) return next(e);
        res.send(results);
    })
});

app.post('/collections/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
        if (e) return next(e);
        res.send(results);
    })
});

app.get('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result){
        if (e) return next(e);
        res.send(result);
    })
});

app.put('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function(e, result){
        if (e) return next(e);
        res.send((result === 1) ? {msg:'success'} : {msg: 'error'});
    })
});

app.delete('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result){
        if (e) return next(e);
        res.send((result === 1)?{msg: 'success'} : {msg: 'error'});
    })
});

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
});

