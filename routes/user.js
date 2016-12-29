// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the userSchema object.
var User = require ('../model/user.js');

// Define routes.

// Handles GET  for login route
router.get ('/login', function (request, response) { // sets route to /user/login

    response.render ('login'); // brings up the login.hbs markpup
});


// Handles POST for login route
router.post ('/login', function (request, response) {
    //console.log ('Login working... username: ' + request.body.username);

    db.collection ('users').findOne (
        {
            username: request.body.username,
            password: request.body.password
        },

        // Additional query options
        {
            //maxTimeMS: 1
        },

        // Callback function
        function (error, result) {
            console.log ('This is the result of the query: ', result);
            console.log ('error : ', error);

            if (error) {
                console.error ('*** ERROR: Unable to connect to the database. ***');
                response.send ('*** database error ***');
            }
            else if (result != null) {
                // Logon successful

                // Save the user to the session
                console.log ('This is the found user: ', result);

                request.session.user = {  // save only the necessary user info
                    username: result.username,
                    email: result.email,
                    access: result.access
                };
                console.log ('This is the session data: ', request.session);

                if (result.access == 'super') {
                    response.redirect ('/chaz/#/');  // need to create super user route
                }
                else if (result.access == 'admin') {
                    response.redirect ('/chaz/#/release');  // admin route
                }
                else {
                    response.redirect ('/chaz/#/'); // need to create playlist route
                }

            }
            else {
                // Problem with login credentials
                console.warn ('*** Invalid username and password. ***');

                request.flash ('error', 'Your username or password is not correct');
                response.redirect ('/user/login');
            }
        }
    );
});

// Handles GET for register route
router.get ('/register', function (request, response) {
    //console.log ('Register user');
    response.render ('register'); // brings up the register.hbs markpup
});

// Handles POST for register route
router.post ('/register', function (request, response) {
    //console.log ('Login working... username: ' + request.body.username);

    db.collection ('users').insertOne (
        {
            username: request.body.username,
            password: request.body.password,
            access:   'basic'
        },

        // Additional query options
        {
            //maxTimeMS: 1
        },

        // Callback function
        function (error, result) {
            console.log ('This is the result of the insert: ', result);
            console.log ('error : ', error);

            if (error) {
                console.error ('*** ERROR: Unable to connect to the database. ***');
                response.send ('*** database error ***');
            }

            else if (result != null) {
                // Logon successful
                response.redirect ('/');
            }
            else {
                console.warn ('*** Error registering user. ***');
            }
        }
    );
});

// Handles GET  for logout route
router.get ('/logout', function (request, response) {
    // Add in when needed.
    // request.session.destroy();
    console.log ('session logout: ', request.session);
    response.redirect ('/user/login');
});

// Export the router from this module.
module.exports = router;
