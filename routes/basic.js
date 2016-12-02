// Pull in express to make use of the framework.
var express = require ('express');

// Grab the url router from express.
// Use this object to attact additional routes
// for our express service app.
var router = express.Router ();

// Home or root route.
router.get ('/', function (request, response){

    // The response object is used to send responses back to the user
    // who made the request.

    //response.send ('<h2>Home Route Test</h2>');

    // Have express render out the string/text markup response
    // that will go to the client.
    response.render ('home');

});

// About route
router.get ('/about', function (request, response) {
    response.render ('about');
});

// Contact route
router.get ('/contact', function (request, response) {
    response.render ('contact');
});

// Login route
router.get ('/login', function (request, response) {
    response.render ('login');
});

// Register route
router.get ('/register', function (request, response) {
    response.render ('register');
});

// Angular route
router.get ('/chaz', function (request, response) {
    // response.send ('chaz route test');
    response.render ('home', {
        //  Override the default index.hbs and use the index.
        layout: 'index-angular'
    });
});

// Export the router from this file that is seen
// by NodeJs as it's own module.
module.exports = router;
