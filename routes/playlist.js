// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Define routes.

//******************************
// PLAYLIST routes.
//******************************
    router.get ('/', function (request, response) {
        console.log ('*** PLAYLIST ROUTE');
    });


// Export the router from this module.
module.exports = router;
