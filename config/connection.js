// config/database.js
var mysql = require('mysql');

module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'root',
        'password': 'root'

	'database': 'tech_db',
    'users_table': 'users'
};