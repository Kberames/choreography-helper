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

//******************************
// PRESENTER routes.
//******************************
    // Route to grab a specific presenter by their id.
    router.get ('/presenter/:id', function (request, response) {
        // Grab the release id by the ':id' value in the url path.
        var presenterId = request.params.id;
        console.log('inside get presenter by id');

        // Use the mongoose query builder to grab the
        // release.
        Presenter.findById(presenterId, function (error, result) {
            if (error) {
                var errorMessage = 'Unable to load presenter.';
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

//******************************
// TRACK routes.
//******************************
    // Route to save a new track.
    router.post ('/track', function (request, response) {
        console.log('inside track post');

        // Create a new track from the data sent
        // down by form or API post.
        var newTrack = Track (request.body);

        var releaseId = newTrack.release;

            // Find a specific product by id.
        Release.findById (releaseId, function (error, release) {
            // Check for errors.
            if (error) {
                var errorMessage = 'Unable to create track for release by id: ' + releaseId;
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                // console.log ("body: ", request.body);
                newTrack.save (function (error) {
                    //Check for errors.
                    if (error) {
                        var errorMessage = 'Unable to save the track.';
                        console.error ('*** ERROR: ' + errorMessage);
                        response.send (errorMessage);
                    }
                    else {
                        console.log ("newTrack: ", newTrack);
                        console.log ('release id: ' + releaseId);

                        release.tracks.push (newTrack);
                        release.save (function (error, relResult) {
                            console.log('attaching track to release');
                        })
                        response.json ({
                            trackId: newTrack._id,
                            message: 'New track was saved.'
                        });
                    }
                });
            }
        });
    });

    // Route to grab a specific track by their id.
    router.get ('/:rel/track/:id', function (request, response) {
        // Grab the release id by the ':id' value in the url path.
        // var trackId = request.params.id;
        // var releaseId = request.params.releaseId;

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // NEED TO FIX THIS
        // var trackId = -1;
        // var releaseId = request.params.id;
        var trackId = request.params.id;
        var releaseId = request.params.rel;

        console.log('inside get track by id, releaseId:' + releaseId);
        console.log('request.PARAMS: ', request.params);

        if (trackId == -1) {
            console.log('NEW BLANK Track');
            response.json ({
                release: releaseId
            });
        }
        else {
            // Use the mongoose query builder to grab the
            // release.
            Track.findById(trackId, function (error, result) {
                if (error) {
                    var errorMessage = 'Unable to load track.';
                    console.error ('*** ERROR: ' + errorMessage);
                    response.send (errorMessage);
                }
                else {
                    console.log('Track findOne: ' + result);
                    response.json (result);
                }
            });
        }
    });

    // Create a route to handle updating an existing track.
    router.put ('/track/:id', function (request, response) {
        var trackId = request.params.id;

        console.log('trackId to update: ' + request.params.id);

        console.log('**RELEASE**: ' + request.body.release);

        console.log('request body: ', request.body);

        Track.findByIdAndUpdate (
            // id to search by
            trackId,

            // What needs to be udpdated.
            request.body,

            // Callback function.
            function (error, result) {
                if (error) {
                    var errorMessage = 'Unable to save track.';
                    console.error ('*** ERROR: ' + errorMessage);
                    response.send (errorMessage);
                }
                else {
                        response.json ({
                            message: 'Track was updated.'});
                }
            }
        );
    });

    // // Create a route to handle creating a track.
    // router.post ('/track', function (request, response) {
    //     var newTrack = Track (request.body);
    //
    //     console.log('**RELEASE**: ' + Release);
    //
    //     console.log ("body: ", request.body);
    //     console.log ("body: ", newTrack);
    //     newTrack.save (function (error) {
    //         //Check for errors.
    //         if (error) {
    //             var errorMessage = 'Unable to save the track.';
    //             console.error ('*** ERROR: ' + errorMessage);
    //             response.send (errorMessage);
    //         }
    //         else {
    //             response.json ({
    //                 message: 'New track was saved.'
    //             });
    //         }
    //     });
    // });

// Route to test.
router.get ('/test', function (request, response) {
    console.log("Testing Media Routes");   response.send ("Testing Media Routes");
});

// Export the router from this module.
module.exports = router;
