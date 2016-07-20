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
            //console.log(res);
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

    }, // end of updateEmployeeProfile

    updateEmployeePortfolio: function(title, startDate, endDate, desc, skills, userID) {
        console.log(title, startDate, endDate, desc, skills, userID);
        return new Promise(function(resolve, reject) {
            var queryString = "INSERT INTO tech_db.portfolio ( id, tite, startDate, endDate, description, skillsUsed ) values (?,?,?,?,?,?)"
            console.log(queryString);
            connection.query(queryString, [userID, title, startDate, endDate, desc, skills], function(err, res) {
                if (err) reject(err);
                else resolve(res);
            })
        })

    }, // end of updateEmployeeProfile

    addPhoto: function(table, userID, fileName, cb) {
        //return new Promise(function(resolve, reject) {
                var queryString = 'UPDATE tech_db.' + table + ' SET profile_img = ? where id = ?'
                console.log(queryString);
                var values = [fileName, userID];
                console.log(values);
                connection.query(queryString, values, function(err, res) {
                        console.log(res);
                        if (err) reject(err);
                        else resolve(res);
                    }) //end of connection.query
          //  }) // end of return new Promise for addPhoto
    }, // end of addPhoto 

    addSkill: function(table, empID, skillID, cb) {
        return new Promise(function(resolve, reject) {
                var queryString = 'INSERT INTO tech_db.' + table + ' SET ?'
                var values = {empID: empID, skillID: skillID} 
                console.log(queryString);
                console.log(values);
                connection.query(queryString, values, function(err, res) {
                       if (err) throw err;
                       return cb(res);
                        // if (err) reject(err);
                        // else resolve(res);
                    }) //end of connection.query
            }) // end of return new Promise for addskill
    }, // end of addSkill

    getSkills: function(empID, cb) {
       // return new Promise(function(resolve, reject) {

           // select * from skills s left join emp_skills e on s.id = e.skillID where empID = 1;
                var queryString = 'SELECT * from tech_db.skills s left join tech_db.emp_skills e on s.id = e.skillID where e.empID = ?'
                //var values = {empID: empID, skillID: skillID} 
                console.log(queryString);
                //console.log(values);
                connection.query(queryString, [empID], function(err, res) {
                    if (err) throw err;
                       return cb(res);
                      //  if (err) reject(err);
                      //  else resolve(res);
                    }) //end of connection.query
          //  }) // end of return new Promise for getSkills
    } // end of getSkills

}; // end of orm
module.exports = orm;
