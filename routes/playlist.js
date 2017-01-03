// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the Schema objects for playlist.
var Playlist = require ('../model/playlist.js');

// Define routes.

//******************************
// PLAYLIST routes.
//******************************

    // Route to view my playlists.
    router.get ('/', function (request, response) {
        var user = request.session.user;
        console.log ('*** PLAYLIST ROUTE', user);

        if (user) {
            Playlist.find ({'user': user}, function (error, result){
            // Playlist.find ({}, function (error, result){
                if (error) {
                    var errorMessage = 'Unable to load playlists.';
                    console.error ('*** ERROR: ' + errorMessage);
                    response.send (errorMessage);
                }
                else {
                    console.log('Playlist find: ' + result);
                    response.json (result);
                }
            });
        }
        else {
            response.send ('login');
        }
    });

    // Route to grab a specific playlist by their id.
    router.get ('/:id', function (request, response) {
        // Grab the playlist id by the ':id' value in the url path.
        var playlistId = request.params.id;
        console.log('request.PARAMS: ', request.params);

        // Use the mongoose query builder to grab the
        // playlist.
        Playlist.findById(playlistId)
        .populate({
            path: 'tracks',
            populate: {
                path: 'release'
            }
        })
            .exec (function (error, result) {
                if (error) {
                    var errorMessage = 'Unable to load playlist.';
                    console.error ('*** ERROR: ' + errorMessage);
                    response.send (errorMessage);
                }
                else {
                    console.log('Playlist findById: ' + result);
                    response.json (result);
                }
            });
    });

// Export the router from this module.
module.exports = router;
