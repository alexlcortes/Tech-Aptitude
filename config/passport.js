// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./connection');
var connection = mysql.createConnection(process.env.JAWSDB_URL);
// var connection = mysql.createConnection(dbconfig.connection);

//connection.connect();

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                }
                else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        email: email,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };
                   // console.log(req);
                   // console.log(newUserMysql);
                    var insertQuery = "INSERT INTO users ( email, password, firstName, lastName ) values (?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.email, newUserMysql.password, newUserMysql.firstName, newUserMysql.lastName],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        var insertQuery = 'INSERT INTO social_media ( userid ) values (?)'
                        connection.query(insertQuery, [rows.insertId], function(err, rows){
                            //this adds userId into 
                        })
                        insertQuery = 'INSERT INTO skill_level ( userid, HTML, CSS, JavaScript, Node, JQuery ) values (?,?,?,?,?,?)'
                        connection.query(insertQuery, [rows.insertId, "Untested", "Untested", "Untested", "Untested", "Untested"], function(err, rows){
                            //this adds userId into 
                        })
                       // connection.query('INSERT INTO social_media (userid) values ('+ rows.insertID +')';)

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
