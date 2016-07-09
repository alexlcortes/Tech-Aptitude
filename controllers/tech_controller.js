var express = require('express');
var bodyParser = require('body-parser');
var html = require('../views/index.handlebars');
var orm = require('../config/orm.js');
var app = express();


// Creating Routes
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.send('login page')
	})


}