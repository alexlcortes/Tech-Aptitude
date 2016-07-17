// var connection = require('./connection.js');
var mysql = require('mysql');
var dbconfig = require('./connection');
var connection = mysql.createConnection(dbconfig.connection);

var orm = {

    getPersonalData: function(table, userID, cb) {
        var queryString = 'SELECT * FROM tech_db.' + table + ' WHERE id = ' + userID;
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            console.log(res);
            return cb(res);

        });  // end of connection query
    } // end of getPersonalData


};// end of orm

module.exports = orm;