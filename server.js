
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var connection = require('./config/connection.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars',
    exphbs({ defaultLayout: 'main' })
);
app.set('view engine', 'handlebars');

require('./controllers/tech_controller.js')(app);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});