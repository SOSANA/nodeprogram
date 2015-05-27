/*
 * node program manual p.55 or http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/
 *  
 * github source code: https://github.com/azat-co/rest-api-express
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

var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser')
  logger = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true})

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', function(req, res, next) {
  res.send('please select a collection, e.g., /collections/messages')
})

app.get('/collections/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit: 10, sort: {'_id': -1}}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

app.post('/collections/:collectionName', function(req, res, next) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

app.get('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.findById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function(e, result){
    if (e) return next(e)
    res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
  })
})

app.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.removeById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
  })
})

app.listen(3000, function(){
  console.log('Express server listening on port 3000')
})

