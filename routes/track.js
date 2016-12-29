// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the track Schema object.
var Release = require ('../model/release.js');
var Track = require ('../model/track.js');

// Define routes.
//******************************
// TRACK routes.
//******************************
    // Route to save a new track.
    router.post ('/', function (request, response) {
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
    // router.get ('/:rel/track/:id', function (request, response) {
    router.get ('/:id', function (request, response) {
        // Grab the release id by the ':id' value in the url path.
        var trackId = request.params.id;
        console.log('request.PARAMS: ', request.params);

        // Use the mongoose query builder to grab the
        // release.
        Track.findById(trackId)
        .populate({
            path: 'presenters',
        })
            .exec (function (error, result) {
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
    });

    // Create a route to handle updating an existing track.
    router.put ('/:id', function (request, response) {
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

    //Create a route to delete a track by id.
    router.get ('/:id/delete', function (request, response) {
        var trackId = request.params.id;

        Track.findByIdAndRemove (trackId, function (error, result) {
            if (error) {
                var errorMessage = 'Unable to delete track: ' + trackId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                if (request.sendJson) {
                    response.json ({
                        message: 'Track was deleted.'
                    });
                }
                else {
                    response.redirect ('/release');
                }
            }
        });
    });

// Export the router from this module.
module.exports = router;
