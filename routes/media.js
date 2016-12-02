// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the userSchema object.
var Release = require ('../model/release.js');

// Define routes.

// Route to view my releases.
router.get ('/', function (request, response) {
    // response.send ('This is where we list releases.');
    // response.json ([
    //     {program : "BODYPUMP"},
    //     {program : "RPM"},
    //     {program : "CXWORX"}
    //
    // ]);

    Release.find ({}, function (error, result){
        if (error) {
            var errorMessage = 'Unable to load releases.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            // console.log('Release find: ' + result);
            response.json (result);
        }
    });
});

// Export the router from this module.
module.exports = router;
