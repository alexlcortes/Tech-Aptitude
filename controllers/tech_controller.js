// Creating Routes
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index'); // load the index file
	});
	app.get('/profile', function(req, res) {
		res.render('profile'); // load the index file
	});
	app.get('/edit_profile', function(req, res) {
		// load the edit_profile file
		res.render('edit_profile'); 
	});
	app.get('/employeer', function(req, res) {
		// load the edit_profile file
		res.render('employeer'); 
	});
}