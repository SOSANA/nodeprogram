/*
 * Mongodb Notes
 * 
 * Full documentation is also available at http://mongodb.github.com/node-mongodb-native/api-generated/db.html.
 * 
 * A full overview of the MongoDB interactive shell is available at mongodb.org: Overview - The
 * MongoDB Interactive Shell: http://docs.mongodb.org/manual/tutorial/getting-started-with-the-mongo-shell/
 * 1  > help
 * 2  > show dbs
 * 3  > use board
 * 4  > show collections
 * 5  > db.messages.remove();
 * 6  > var a = db.messages.findOne();
 * 7  > printjson(a);
 * 8  > a.message = "hi";
 * 9  > db.messages.save(a);
 * 10 > db.messages.find({});
 * 11 > db.messages.update({name: "John"},{$set: {message: "bye"}});
 * 12 > db.messages.find({name: "John"});
 * 13 > db.messages.remove({name: "John"});
 * 
 * Full documentation is also available at http://mongodb.github.com/node-mongodb-native/api-generated/db.html.
 * 
*/