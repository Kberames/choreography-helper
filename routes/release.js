// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the Schema objects for release,
// track & presenter.
var Release = require ('../model/release.js');

var Track = require ('../model/track.js');
// var Presenter = require ('../model/presenter.js');

// Define routes.

//******************************
// RELEASE routes.
//******************************
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
    router.get ('/:id', function (request, response) {
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
    router.put ('/:id', function (request, response) {
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

    // Route to save release. (POST)
    router.post ('/', function (request, response) {
        // Create a new product from the data sent
        // down by form.
        var newRelease = Release (request.body);

        console.log ("post release body: ", newRelease);

        newRelease.save (function (error) {
            //Check for errors.
            if (error) {
                var errorMessage = 'Unable to save the release.';
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                response.json ({
                    message: 'Release was saved.'
                });
            }
        });
    });

    //Create a route to delete a release by id.
    router.get ('/:id/delete', function (request, response) {
        console.log ('delete params: ', request.params);
        var releaseId = request.params.id;


        Release.findByIdAndRemove (releaseId, function (error, result) {
            if (error) {
                var errorMessage = 'Unable to delete release: ' + releaseId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                if (request.sendJson) {
                    response.json ({
                        message: 'Release was deleted.'
                    });
                }
                else {
                    response.redirect ('/release');
                }
            }
        });
    });

// Route to test.
router.get ('/test', function (request, response) {
    console.log("Testing Media Routes");   response.send ("Testing Media Routes");
});

// Export the router from this module.
module.exports = router;
