// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the Schema objects for release,
// track & presenter.
var Release = require ('../model/release.js');
var Track = require ('../model/track.js');
var Presenter = require ('../model/presenter.js');

// Define routes.

// Route to view my releases.
router.get ('/', function (request, response) {
    // response.send ('This is where we list releases.');

    Release.find ({}, function (error, result){
        if (error) {
            var errorMessage = 'Unable to load releases.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            console.log('ReleaseList find: ' + result);
            response.json (result);
        }
    });
});

// Route to grab a specific release by it's id.
router.get ('/release/:id', function (request, response) {
    // Grab the release id by the ':id' value in the url path.
    var releaseId = request.params.id;
    console.log('inside get release by id');

    // Use the mongoose query builder to grab the
    // release.
    Release.findById(releaseId)
    .populate({
        path: 'tracks',
    })
    .populate({
        path: 'presenters',
    })
        .exec (function (error, result) {
            if (error) {
                var errorMessage = 'Unable to load release.';
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                console.log('Release findOne: ' + result);
                response.json (result);
            }
        });
});

// Create a route to handle updating an existing release.
router.put ('/release/:id', function (request, response) {
    var releaseId = request.params.id;

    console.log('releaseId to update: ' + request.params.id);

    console.log('request body: ', request.body);

    Release.findByIdAndUpdate (
        // id to search by
        releaseId,

        // What needs to be udpdated.
        request.body,

        // Callback function.
        function (error, result) {
            if (error) {
                var errorMessage = 'Unable to save release.';
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                    response.json ({
                        message: 'Release was updated.'});
            }
        }
    );
});

// Route to grab a specific presenter by their id.
router.get ('/presenter/:id', function (request, response) {
    // Grab the release id by the ':id' value in the url path.
    var presenterId = request.params.id;
    console.log('inside get presenter by id');

    // Use the mongoose query builder to grab the
    // release.
    Presenter.findById(presenterId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to load release.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            console.log('Release findOne: ' + result);
            response.json (result);
        }
    });
});

// Create a route to handle updating an existing presenter.
router.put ('/presenter/:id', function (request, response) {
    var presenterId = request.params.id;

    console.log('presenterId to update: ' + request.params.id);

    console.log('request body: ', request.body);

    Presenter.findByIdAndUpdate (
        // id to search by
        presenterId,

        // What needs to be udpdated.
        request.body,

        // Callback function.
        function (error, result) {
            if (error) {
                var errorMessage = 'Unable to save presenter.';
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                    response.json ({
                        message: 'Presenter was updated.'});
            }
        }
    );
});

// Route to test.
router.get ('/test', function (request, response) {
    console.log("Testing Media Routes");   response.send ("Testing Media Routes");
});

// Export the router from this module.
module.exports = router;
