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
 * The UI/browser app for the Chat is in this folder: https://github.com/azat-co/rpjs/tree/master/backbone.

var http = require('http');
var assert = require('assert');
var querystring = require('querystring');
var util = require('util');

var messageBoard = require('./mb-server');


assert.deepEqual('[{"name":"John","message":"hi"}]', messageBoard.getMessages());
assert.deepEqual('{"name":"Jake","message":"gogo"}',messageBoard.addMessage("name=Jake&message=gogo"));
assert.deepEqual('[{"name":"John","message":"hi"},{"name":"Jake","message":"gogo"}]', messageBoard.getMessages("name=Jake&message=gogo"));