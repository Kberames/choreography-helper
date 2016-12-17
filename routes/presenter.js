// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the presenter Schema object.
var Release = require ('../model/release.js');
var Presenter = require ('../model/presenter.js');

// Define routes.
//******************************
// PRESENTER routes.
//******************************
    // Route to save a new presenter.
    router.post ('/', function (request, response) {
        console.log('inside presenter post');

        // Create a new presenter from the data sent
        // down by form or API post.
        var newPresenter = Presenter (request.body);

        var releaseId = newPresenter.release;

            // Find a specific product by id.
        Release.findById (releaseId, function (error, release) {
            // Check for errors.
            if (error) {
                var errorMessage = 'Unable to create presenter for release by id: ' + releaseId;
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                // console.log ("body: ", request.body);
                newPresenter.save (function (error) {
                    //Check for errors.
                    if (error) {
                        var errorMessage = 'Unable to save the presenter.';
                        console.error ('*** ERROR: ' + errorMessage);
                        response.send (errorMessage);
                    }
                    else {
                        console.log ("newPresenter: ", newPresenter);
                        console.log ('release id: ' + releaseId);

                        release.presenters.push (newPresenter);
                        release.save (function (error, relResult) {
                            console.log('attaching presenter to release');
                        })
                        response.json ({
                            presenterId: newPresenter._id,
                            message: 'New presenter was saved.'
                        });
                    }
                });
            }
        });
    });

    router.get ('/:id', function (request, response) {
        // Grab the release id by the ':id' value in the url path.
        var presenterId = request.params.id;
        console.log('request.PARAMS: ', request.params);

        // Use the mongoose query builder to grab the
        // presenter.
        Presenter.findById(presenterId, function (error, result) {
            if (error) {
                var errorMessage = 'Unable to load presenter.';
                console.error ('*** ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                console.log('Presenter findOne: ' + result);
                response.json (result);
            }
        });
    });

    // Create a route to handle updating an existing presenter.
    router.put ('/:id', function (request, response) {
        var presenterId = request.params.id;

        console.log('presenterId to update: ' + request.params.id);

        console.log('**RELEASE**: ' + request.body.release);

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

    //Create a route to delete a presenter by id.
    router.get ('/:id/delete', function (request, response) {
        var presenterId = request.params.id;

        Presenter.findByIdAndRemove (presenterId, function (error, result) {
            if (error) {
                var errorMessage = 'Unable to delete presenter: ' + presenterId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                if (request.sendJson) {
                    response.json ({
                        message: 'Presenter was deleted.'
                    });
                }
                else {
                    response.redirect ('/media');
                }
            }
        });
    });

// Export the router from this module.
module.exports = router;
