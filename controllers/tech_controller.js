// Require orm
var orm = require('../config/orm.js');

// Added these modules for uploading a file
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

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
    app.get('/', isLoggedInIndex, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('index', { message: req.flash('loginMessage'), background: true });
    });


    // process the login form
    app.post('/', passport.authenticate('local-login', {
            successRedirect: '/employee_profile', // redirect to the secure profile section
            failureRedirect: '/', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
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
    app.get('/signup', isLoggedInIndex, function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/employee_profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages  
    }));


    // =====================================
    // Employee ==============================
    // =====================================

    app.get('/employee_profile', isLoggedIn, function(req, res) {
        var userid = req.user.id;
        orm.getPersonalData('users', 'social_media', userid, function(data) {
            //console.log(data);
            var userData = data;
            console.log(userData);

            orm.skillOptions(userid, function(data) {
                var skillOptions = data;
                console.log(skillOptions);
                                
                orm.getSkills(userid, function(data) {
                    var skillData = data;
                    console.log(skillData);


                    orm.getPortfolio(userid, function(data) {
                        var portData = data;
                        console.log(portData);
                        res.render('employee/employee_profile', { user: userData, skills: skillData, skillOpt: skillData, portfolio: portData })

                    // get the user out of session and pass to template
                    })
                })
            })
        });
    }); //end of get employee Profile///


    app.get('/employee_edit_profile', isLoggedIn, function(req, res) {
        // load the edit_profile file
        var userid = req.user.id;
        orm.getPersonalData('users', 'social_media', userid, function(data) {
        res.render('employee/employee_edit_profile', { user: data });
        });
    });

    app.post('/update_employee_profile', isLoggedIn, function(req,res) {        
    	orm.updateEmployeeProfile('users', req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.id);
    	res.redirect('/employee_profile');
    })

    app.get('/employee_edit_resume', function(req, res) {
        // load the edit_profile file
        res.render('employee/employee_edit_resume');
    });

    app.get('/employee_edit_portfolio', function(req, res) {
        // load the edit_profile file
        res.render('employee/employee_edit_portfolio');
    });
    app.post('/employee_edit_portfolio', function(req, res) {
        // load the edit_profile file
        console.log(req);
        orm.updateEmployeePortfolio(req.body.title, req.body.startDate, req.body.endDate, req.body.description , req.body.skillsUsed, req.user.id, req.body.photourl)
        res.redirect('/employee_profile')
    });

    // SOCIAL MEDIA
    app.get('/employee_social_media', function(req, res) {
        // load the employee_social_media file
        var userid = req.user.id;
        orm.getSocialMedia('social_media', userid, function(data) {
            var userData = data;
            // load the employee_social_media file
            res.render('employee/employee_social_media', { user: userData});
        });
        
    });

    // SOCIAL MEDIA
    app.post('/add_social_media', function(req, res) {
        orm.addSocialMedia('social_media', req.user.id, req.body.facebook, req.body.twitter, req.body.github, req.body.stackoverflow, req.body.linkedin);
        // load the employee_social_media file
        res.render('employee/employee_social_media');
    });



    //======================================
    // END OF EMPLOYEE
    //======================================

    // =====================================
    // Skills & Skill Tests ================
    // =====================================

    app.get('/html_test',isLoggedIn, function(req, res) {
        // load the edit_profile file
        res.render('skill_tests/html_test');
    });

    app.post('/addSkill', isLoggedIn, function(req, res) {
        orm.addSkill('skills', req.body.id)
    res.redirect('/employee_profile')
    })

    //======================================
    // END OF Skill & Skill Tests
    //======================================

    // =====================================
    // Employer ==============================
    // =====================================
    app.get('/employer', function(req, res) {
        // load the edit_profile file
        res.render('employer/employer');
    });
    app.get('/employer_search', function(req, res) {
        // load the edit_profile file
        res.render('employer/employer_search');
    });
    app.get('/employer_edit_contact', function(req, res) {
        // load the edit_profile file
        res.render('employer/employer_edit_contact');
    });
    app.get('/employer_add_test', function(req, res) {
        // load the edit_profile file
        res.render('employer/employer_add_test');
    });
    app.get('/employer_edit_test', function(req, res) {
        // load the edit_profile file
        res.render('employer/employer_edit_test');
    });
    //======================================
    // END OF Employer
    //======================================

    // =====================================
    // Post for uploading a file ===========
    // =====================================

    app.post('/upload', isLoggedIn, function(req, res) {
        // create an incoming form object
        var form = new formidable.IncomingForm();
        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;
        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, '../public/assets/img_profile');
        form.keepExtensions = true;
        // every time a file has been uploaded successfully, rename it
        // to the userid_firstname_lastname
        form.on('file', function(field, file) {
            var ext = file.name.split('.').pop();
            file.name = req.user.id + '_' + req.user.firstName + '_' + req.user.lastName + '.' + ext;
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            orm.addPhoto('users', req.user.id, file.name);
        });
        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });
        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });
        // parse the incoming request containing the form data
        form.parse(req);
        res.redirect('/employee_profile')
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// route middleware to make sure
function isLoggedInIndex(req, res, next) {

    // if user is authenticated in the session, carry on
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/employee_profile');
}
