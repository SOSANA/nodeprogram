/*
 * node program manual p.68
 * 
 * Creating a small Express.js app that has a Sign in link that allows to authenticate users.
 * 
 * The app will be able to output Twitter user information after the authentication, and get 
 * access toprotected Twitter resources on behalf of this particular user.
 * 
 * The next step is to start MongoDB and paste your own Twitter consumer key and secret. Then, 
 * if we run $ node app.js and open a browser at http://localhost:3000, we should see the home 
 * page as shown below.
*/

// we get the key and secret from environment variables:
var twitterKey = process.env.TWITTER_CONSUMER_KEY
var twitterSecret = process.env.TWITTER_CONSUMER_SECRET

// we import the modules:
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoskin = require('mongoskin'),
    
// we configure the database:
dbUrl = process.env.MONGOHQ_URL ||'mongodb://@localhost:27017/blog',
db = mongoskin.db(dbUrl, {safe: true}),
collections = {
    users: db.collection('users')
}
// we configure import everyauth:
everyauth = require('everyauth');

// now, import the middleware:
// Express.js Middleware
var session = require('express-session'),
logger = require('morgan'),
errorHandler = require('errorhandler'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

// set everyauth in debug mode:
everyauth.debug = true;
// start the chained configuration for our Twitter Sign in:
everyauth.twitter
    .consumerKey(twitterKey)
    .consumerSecret(twitterSecret)
// now we can configure what follows once we get the user information back from Twitter, i.e.,
// when the user has been authenticated successfully. In this example, we store the date in the 
// session (session.user), but we can also save it to the database at the same time:
    .findOrCreateUser(function (session,
        accessToken,
        accessTokenSecret,
        twitterUserMetadata) {
            var promise = this.Promise();
            process.nextTick(function(){
                var username = twitterUserMetadata.screen_name;
                console.log('username is '+ username);
                session.user = twitterUserMetadata;
                session.protected = true;
                // Find or save to the database
                // with collections.users
                promise.fulfill(twitterUserMetadata);
            })
    return promise;
    })
// the last chained method tells everyauth to redirect the user to the /protected page. This page can
// be something that you show only to logged-in users:
    .redirectPath('/protected');
// Everyauth automatically adds the logout route to the Express.js app, but it doesn’t know that we
// added some extra info to the session. So we need it to destroy the custom properties session.user
// and session.protected; otherwise the session will be kept alive:
everyauth.everymodule.handleLogout(routes.user.logout);
// Because we aren't saving the user to the database in this example, we can just return the user right 
// back in this findUserById setup:
everyauth.everymodule.findUserById(function (user, callback) {
        callback(user);
});
// instantiate the Express.js object and assign the title:
var app = express();
app.locals.appTitle = 'everyauth-twitter';
// Define the middleware to check for the users collection:
Define the middleware to check for the users collection:
app.use(function(req, res, next) {
    if (! collections.users)
        return next(new Error('No collections.'));
    req.collections = collections;
    return next();
});
// Express.js configuration statements:
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Express.js middleware configurations for logging requests and parsing payloads (request bodies):
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Important! It’s necessary to have the following middleware defined in this order:
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({
secret: '2C44774A-D649-4D44-9535-46E296EF984F'
}))
app.use(everyauth.middleware());
// the rest of the Express.js middleware:
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
// authentication middleware, in which we expose the protected flag to Jade templates, is as follows:
app.use(function(req, res, next) {
    if (req.session && req.session.protected)
            res.locals.protected = true;
        next();
});
// authorization middleware will protect unauthorized access to the protected pages:
var authorize = function(req, res, next) {
    if (req.session && req.session.auth)
        return next();
    else
        return res.send(401);
};
// the default Express.js error-handling middleware is as follows:
    if ('development' == app.get('env')) {
        app.use(errorHandler());
}
// We have only two pages and routes:
app.get('/', routes.index);
app.get('/protected', authorize, routes.admin);
// Catch other routes with 404 status and start up the server:
app.all('*', function(req, res) {
    res.send(404);
})

var server = http.createServer(app);
var boot = function () {
    server.listen(app.get('port'), function(){
        console.info('Express server listening on port '+ app.get('port'));
    });
}
var shutdown = function() {
    server.close();
}
if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module')
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}