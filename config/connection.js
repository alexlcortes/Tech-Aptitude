// config/database.js
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tech_db',
//    users_table: 'users'
});


// module.exports = {
//     'connection': {
//         'host': 'localhost',
//         'user': 'root',
//         'password': 'root'
//     },
// 	'database': 'tech_db',
//     'users_table': 'users'
// };


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;  // JONATHON -- I need to access this in the ORM.js file.