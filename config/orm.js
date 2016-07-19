// var connection = require('./connection.js');
var mysql = require('mysql');
var dbconfig = require('./connection');
var connection = mysql.createConnection(dbconfig.connection);

var orm = {

    getPersonalData: function(table, userID, cb) {
        var queryString = 'select * from tech_db.' + table + ' where id = ' + userID;
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            console.log(res);
            return cb(res);

        }); // end of connection query
    }, // end of getPersonalData
    getPhoto: function(table, userID, cb) {
        return new Promise(function(resolve,reject){
            var queryString = "SELECT profile_pic FROM tech_db." + table + " WHERE id = " + userID;
            connection.query(queryString, function(err, res) {
                if (err) throw err;
                return cb(res);
            });
        });
    },
    addPhoto: function(table, profile_pic, cb) {
        return new Promise(function(resolve,reject){
            var queryString = "UPDATE tech_db." + table + " SET profile_pic = ?";
            connection.query(queryString, [profile_pic], function(err, res) {
                if (err) throw err; 
                else resolve(res);
            });
        });
    }
}; // end of orm
module.exports = orm;
