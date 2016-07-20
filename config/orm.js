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

    updateEmployeeProfile: function(table, firstName, lastName, email, street_address, city, state, zip, userID, cb) {
            return new Promise(function(resolve, reject) {
                console.log(table + ',' + firstName + ',' + lastName + ',' + street_address + ',' + city + ',' + state + ',' + zip);
                var queryString = 'UPDATE tech_db.' + table + ' SET firstName = ?, lastName = ?, email = ?, street_address = ?, city = ?, state = ?, zip = ? where id = ?'
                console.log(queryString);
                connection.query(queryString, [firstName, lastName, email, street_address, city, state, zip, userID], function(err, res) {
                    if (err) reject(err);
                    else resolve(res);
                })
            })

        } // end of updateEmployeeProfile
}; // end of orm
module.exports = orm;
