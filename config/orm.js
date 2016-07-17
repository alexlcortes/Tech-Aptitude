var connection = require('./connection.js');

var orm = {

        getPersonalData: function(table, userID, cb) {
            var queryString = 'select * from tech_db.' + table + ' where id = ' + userID;
            console.log(queryString);
            connection.query(queryString, function(err, res) {
                if (err) throw err;
                console.log(res);
                return cb(res);

            }); // end of connection query
        } // end of getPersonalData


}; // end of orm
module.exports = orm;
