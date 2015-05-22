var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/", function(err, db) {
  var myDB = db.db("test");

  myDB.collection("test", function(err, collection){
    find(collection);
    console.log("This is working");
    setTimeout( function(){ myDB.close(); }, 3000);
  });
});

function find(collection){
  var query = {};
  collection.findOne(query, function(err, item){
    console.log(item);
  });
}