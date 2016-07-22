// var connection = require('./connection.js');
var mysql = require('mysql');
var dbconfig = require('./connection');
var connection = mysql.createConnection(dbconfig.connection);

var orm = {

    getPersonalData: function(table, userID, cb) {
        var queryString = 'select * from tech_db.' + table + ' where id = ' + userID;
        // var queryString = 'SELECT * FROM tech_db.' + table1 + ' AS u INNER JOIN tech_db.' + table2 + ' AS sm ON (u.id = sm.userid) WHERE u.id = ' + userID;
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getPersonalData

    getSocialData: function(table, userID, cb) {
        //var queryString = 'select * from tech_db.' + table + ' where id = ' + userID;
        var queryString = 'SELECT * FROM tech_db.' + table + ' WHERE userid = ' + userID;
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getPersonalData

    updateEmployeeProfile: function(table, firstName, lastName, email, phone, street_address, city, state, zip, userID, cb) {
        return new Promise(function(resolve, reject) {
            if (zip == '') {
                zip = null;
            }
            if (street_address == ''){
                street_address = null;
            }
 
            var queryString = 'UPDATE tech_db.' + table + ' SET firstName = ?, lastName = ?, email = ?, mobile_number = ?, street_address = ?, city = ?, state = ?, zip = ? where id = ?'
            console.log(queryString);
            connection.query(queryString, [firstName, lastName, email, phone, street_address, city, state, zip, userID], function(err, res) {
                if (err) reject(err);
                else resolve(res);
            })
        })

    }, // end of updateEmployeeProfile

    updateEmployeePortfolio: function(title, startDate, endDate, desc, skills, userID, pic) {
        console.log(title, startDate, endDate, desc, skills, userID, pic);
        return new Promise(function(resolve, reject) {
            var queryString = "INSERT INTO tech_db.portfolio ( id, title, startDate, endDate, description, skillsUsed, photo ) values (?,?,?,?,?,?,?)";
            connection.query(queryString, [userID, title, startDate, endDate, desc, skills , pic], function(err, res) {
                if (err) console.log(err);
                else resolve(res);
            })
        })
    }, // end of updateEmployeeProfile

    updateEmployeeSkills: function(empID, skill, skillLevel) {
        return new Promise(function(resolve, reject) {

            var queryString = 'UPDATE tech_db.skill_level SET HTML = ? WHERE userid = ?'
            console.log(queryString);
            connection.query(queryString, [ skillLevel, empID], function(err, res) {
                if (err) throw err;
                 else resolve(res);
            }); //end of connection.query
        }); // end of return new Promise for getSkills
    },

    addPhoto: function(table, userID, fileName, cb) {
        return new Promise(function(resolve, reject) {
                var queryString = 'UPDATE tech_db.' + table + ' SET profile_img = ? where id = ?';
                var values = [fileName, userID];
                connection.query(queryString, values, function(err, res) {
                        console.log(res);
                        if (err) reject(err);
                        else resolve(res);
                    }) //end of connection.query
        }) // end of return new Promise for addPhoto
    }, // end of addPhoto 

    addSkill: function(table, empID, skillID, cb) {
        return new Promise(function(resolve, reject) {
                var queryString = 'INSERT INTO tech_db.' + table + ' SET ?';
                var values = {empID: empID, skillID: skillID} 
                connection.query(queryString, values, function(err, res) {
                       if (err) throw err;
                       return cb(res);
                    }) //end of connection.query
            }) // end of return new Promise for addskill
    }, // end of addSkill

    skillOptions: function(userID, cb){
       // return new Promise(function(resolve, reject) {
            var queryString = 'select skill from tech_db.skills where skill not in (select skill from tech_db.skills s left join tech_db.emp_skills e on s.id = e.skillID where empID = ' + userID + ')';
            console.log(queryString);
            connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
            }) // end of connection.query
      //  }) // end of return new Promise
    }, // end of skillOptions

    getSkills: function(empID, cb) {
       // return new Promise(function(resolve, reject) {

           // select * from skills s left join emp_skills e on s.id = e.skillID where empID = 1;
                var queryString = 'SELECT * from tech_db.skills s left join tech_db.emp_skills e on s.id = e.skillID where e.empID = ?';
                console.log(queryString);
                connection.query(queryString, [empID], function(err, res) {
                    if (err) throw err;
                       return cb(res);
                    }) //end of connection.query
          //  }) // end of return new Promise for getSkills
    }, // end of getSkills

    addSocialMedia: function(table, empID, facebook, twitter, github, stackoverflow, linkedin) {
       return new Promise(function(resolve, reject) {
            var queryString = 'UPDATE tech_db.' + table + ' SET facebook = ? , twitter = ? , github = ? , stackedoverflow = ? , linkedin = ? where userid = ?';          
            var values = [facebook, twitter, github, stackoverflow, linkedin, empID]; 
            console.log(queryString);
            console.log(values);
            connection.query(queryString, values, function(err, res) {
                   if (err) throw err;
                   else resolve(res);
            }) //end of connection.query
        }) // end of return new Promise for addskill
    }, // end of addSocialMedia 

    getSocialMedia: function(table, userID, cb) {
        var queryString = 'SELECT * FROM tech_db.' + table + ' WHERE userid = ' + userID;
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getSocialMedia

    getSkillLevels: function( userID, cb) {
        var queryString = 'SELECT * FROM tech_db.skill_level WHERE userid = ' + userID;
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getSocialMedia

     getPortfolio: function(empID, cb) {
        var queryString = 'SELECT * from tech_db.portfolio where id = ?';
        connection.query(queryString, [empID], function(err, res) {
            if (err) throw err;
               return cb(res);
            })
     }
}; // end of orm
module.exports = orm;
