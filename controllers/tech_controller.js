
// Require orm
var orm = require('../config/orm.js');

// Creating Routes
var express = require('express');
var bodyParser = require('body-parser');
//var html = require('../views/index.handlebars');
var orm = require('../config/orm.js');
var app = express();

module.exports = function(app, passport) {


	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index', { message: req.flash('loginMessage'), background: true });
	});

	// process the login form
	app.post('/', passport.authenticate('local-login', {
            successRedirect : '/employee_profile', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages	
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        var userid = req.user.id
        console.log(userid);
        orm.getPersonalData('users', userid, function(data) {
            console.log(data);
            res.render('profile', { user: data });
            // get the user out of session and pass to template
        })


    });  // end of get profile...

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/employee_profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages	
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/employee_profile', isLoggedIn, function(req, res) {
		var userid = req.user.id;
        orm.getPersonalData('users', userid, function(data){
            console.log(data);
            res.render('employee/employee_profile', { user: data })
             // get the user out of session and pass to template
        });
		// res.render('employee/employee_profile', {
		// 	user : req.user // get the user out of session and pass to template
		// });
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	// =====================================
	// Employee ==============================
	// =====================================
	// app.get('/profile', function(req, res) {
	// 	// load the edit_profile file
	// 	res.render('profile'); 
	// });
	// app.get('/employee_profile', function(req, res) {
	// 	// load the edit_profile file
	// 	res.render('employee/employee_profile'); 
	// });
	app.get('/employee_edit_profile', function(req, res) {
		// load the edit_profile file
		res.render('employee/employee_edit_profile'); 
	});
	app.get('/employee_edit_resume', function(req, res) {
		// load the edit_profile file
		res.render('employee/employee_edit_resume'); 
	});


	// =====================================
	// Employeer ==============================
	// =====================================
	app.get('/employeer', function(req, res) {
		// load the edit_profile file
		res.render('employeer/employeer'); 
	});
	app.get('/employeer_search', function(req, res) {
		// load the edit_profile file
		res.render('employeer/employeer_search'); 
	});
	app.get('/employeer_edit_contact', function(req, res) {
		// load the edit_profile file
		res.render('employeer/employeer_edit_contact'); 
	});
	app.get('/employeer_add_test', function(req, res) {
		// load the edit_profile file
		res.render('employeer/employeer_add_test'); 
	});
	app.get('/employeer_edit_test', function(req, res) {
		// load the edit_profile file
		res.render('employeer/employeer_edit_test'); 
	});
>>>>>>> 875986e38257622f3903850d7d8a3a755b75ac6d
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
