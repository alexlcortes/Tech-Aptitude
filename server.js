
var express = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var connection = require('./config/connection.js');
var passport = require('passport');
var morgan = require('morgan');
var flash    = require('connect-flash');

var app = express();
var PORT = process.env.PORT || 3000;

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport); // pass passport for configuration

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: 'xwingforlyfe',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session


require('./controllers/tech_controller.js')(app, passport);

app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});