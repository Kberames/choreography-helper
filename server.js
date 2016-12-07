// Load in the express nodejs module (framework).
var express = require ('express');

// Create the express server app (instance of express).
var server = express ();

// Set the public folder that can be accessed by any public user.
server.use (express.static ('public'));

// Make sure the body-parser has been installed
// (npm install body-parser --save)
var bodyParser = require ('body-parser');

// Set express to use the body parser to pull the
// data out of any POST requests from the browser.
server.use (bodyParser.urlencoded ({ extended: true}));

// Set express to parse raw JSON data if it is sent down
// as part of the request body.
server.use (bodyParser.json());

// Load the method override so express can know what
// HTTP method other than GET & POST is being used.
var methodOverride = require ('method-override');

// Let express know that we are overriding the HTTP method
// and using the method sent in the form data.
server.use (methodOverride (function (request, response) {
    // Grab the request information and check to see
    // if the HTTP method was sent down as an _method value.

    // Check if the request has body content.
    if (request.body) {
        if (typeof request.body === 'object') {

            //Check if the body has an '_method' property on it.
            if (request.body._method) {

                // Grab the HTTP method from the body.
                var method = request.body._method;

                //Remove the _method property from the body.
                delete request.body._method;

                // Return the actual HTTP method.
                return method;
            }
        }
    }
}));


// Load in the express session handler.
var session = require ('express-session');

// Configure the session to be used by express.
server.use (session ({
    secret: 'This is my secret phrase', // Used to hash/encrypt the session key.
    resave: false,
    saveUninitialized: true
}));

// Load in the connect-flash express middleware.
var flash = require ('connect-flash');

// Set our server app to use the flash message object.
server.use (flash());

// Set a global function that will be run before any of our
// other routes are run.
server.use (function (request, response, next) {
    // Set the local data in the template to
    // use the user session data.
    response.locals.user = request.session.user;

    // Set the flash object to be used before
    // running any other routes or functions.
    response.locals.message = request.flash ();

    // Grab the content-type from the request.
    var contentType = request.headers ['content-type'];
    request.contentType = contentType;

    // Set the request object to use JSON if
    // we detect a request for 'application/json'.
    if (contentType == 'application/json') {
        request.sendJson = true;
    }
    //console.log('The content type is: ' + contentType);

    // Move on to the next route.
    // ***** research this function for better understanding
    next();
})

// Set the port that our server will run on.
var port = 3000;

// Configure the render engine handlebars.
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars({
    layoutsDir: 'templates',                // The directory of layout files.
    defaultLayout: 'index',                 // The base/main template to always load.
    extname: '.hbs'                         // The file extension to use.
}));

// Set the default directory for express to use for
// the handlebar templates.
server.set ('views', __dirname + '\\templates\\partials');

// Set the render engine for our server.
server.set ('view engine', '.hbs');

// Bring in the MongoDB client driver and
// connect to the database.
var mongoClient = require ('mongodb').MongoClient;

// Create a reference to the database.
global.db;

// Create a connection to the database.
mongoClient.connect ('mongodb://localhost:27017/chaz', function (error, database) {
    // Check if there was an error connecting to the database.
    if (error) {
        console.error('*** ERROR: Unable to connect to the mongo database.');
        console.log (error);
        }
    else {
        // All good to start the server app.
        //Launch the server app.
        server.listen (port, function (error){
            // Check to see if the server was unable to startup
            if (error !== undefined) {
                console.error('*** ERROR: Unable to start the server.');
                console.log (error);
                }
            else {
                // Link to the database reference.
                db = database;

                console.log (' - The server has successfully started on port: ' + port)
            }
        });
    }
});


//---------------------------------------
// Set the url routes the server can use.

// Import in the routes to use.
var basicRoutes = require ('./routes/basic.js');

// Set our server to use the basic routes.
server.use ('/', basicRoutes);

// Connect the user routes.
var userRoutes = require ('./routes/user.js');
server.use ('/user', userRoutes);

// Connect the release routes.
var mediaRoutes = require ('./routes/media.js');
server.use ('/media', mediaRoutes);

// Test a database query.
server.get ('/test', function (request, response) {

    // Pull a set of test users from the database.
    //db.collection ('users').find ().toArray (function (error, result) {
    //    console.log ('This is the result of the query: ', result);
    //});

    db.collection ('users').findOne ({ username: 'kim'}, {},
    function (error, result) {
        console.log ('This is the result of the query: ', result);
    }); // *** WORKS!

    response.send ('db test was run');
});

//------------------------------------------------------------
// Sandbox for Mongoose.

// Load in the mongoose nodejs package. (not specific to express framework)
var mongoose = require ('mongoose');

// Connect mongoose to the mongodb server.
mongoose.connect ('mongodb://localhost:27017/chaz');

// Set the mongoose promise library to use.
mongoose.Promise = require('bluebird');

/*
// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the User.
var userSchema = new Schema ({
    username: String,
    password: String
});

// Take the userSchema object and create a
// user model object for working with the mongodb.
var User = mongoose.model ('User', userSchema);
*/
