// var connection = require('./connection.js');
var mysql = require('mysql');
var dbconfig = require('./connection');
var connection = mysql.createConnection(process.env.JAWSDB_URL);
// var connection = mysql.createConnection(dbconfig.connection);

// connection.connect()

var orm = {

    getPersonalData: function(table, userID, cb) {
        var queryString = 'select * from nd94bu2dunh75gd2.' + table + ' where id = ' + userID;
        // var queryString = 'SELECT * FROM tech_db.' + table1 + ' AS u INNER JOIN tech_db.' + table2 + ' AS sm ON (u.id = sm.userid) WHERE u.id = ' + userID;
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getPersonalData

    getSocialData: function(table, userID, cb) {
        //var queryString = 'select * from tech_db.' + table + ' where id = ' + userID;
        var queryString = 'SELECT * FROM nd94bu2dunh75gd2.' + table + ' WHERE userid = ' + userID;
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
            if (street_address == '') {
                street_address = null;
            }

            var queryString = 'UPDATE nd94bu2dunh75gd2.' + table + ' SET firstName = ?, lastName = ?, email = ?, mobile_number = ?, street_address = ?, city = ?, state = ?, zip = ? where id = ?'
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
            var queryString = "INSERT INTO nd94bu2dunh75gd2.portfolio ( id, title, startDate, endDate, description, skillsUsed, photo ) values (?,?,?,?,?,?,?)";
            connection.query(queryString, [userID, title, startDate, endDate, desc, skills, pic], function(err, res) {
                if (err) console.log(err);
                else resolve(res);
            })
        })
    }, // end of updateEmployeeProfile

    updateEmployeeSkills: function(empID, skill, skillLevel) {
        console.log('empid: ' + empID);
        console.log('skill: ' + skill);
        console.log('skillLevel: ' + skillLevel);

        return new Promise(function(resolve, reject) {
            return new Promise(function(resolve, reject) {
                    console.log('inside 2nd promise inside updateEmployeeSkills');
                    var queryString = "select id from nd94bu2dunh75gd2.skills where skill = '" + skill + "'"
                    console.log(queryString);
                    connection.query(queryString, function(err, res) {
                        if (err) reject(err)
                        else {
                            var skillID = res;
                            var queryString = 'UPDATE nd94bu2dunh75gd2.skill_level SET skill_level = ? WHERE skillsID = ? and empID = ?'
                            console.log(queryString);
                            connection.query(queryString, [ skillLevel, skillID[0].id, empID], function(err, res) {
                                if (err) throw err;
                                 else resolve(res);
                            }); //end of connection.query
                        } // end of else
                    }) // end of first connection.query
            }); // end of 2nd return new Promise for updateEmployeeSkills
        }); // end of first return new Promise for updateEmployeeSkills
    },

    addPhoto: function(table, userID, fileName, cb) {
        return new Promise(function(resolve, reject) {
                var queryString = 'UPDATE nd94bu2dunh75gd2.' + table + ' SET profile_img = ? where id = ?';
                var values = [fileName, userID];
                connection.query(queryString, values, function(err, res) {
                        console.log(res);
                        if (err) reject(err);
                        else resolve(res);
                    }) //end of connection.query
            }) // end of return new Promise for addPhoto
    }, // end of addPhoto 

    addResume: function(table, userID, fileName, cb) {
        return new Promise(function(resolve, reject) {
                var queryString = 'UPDATE nd94bu2dunh75gd2.' + table + ' SET resume = ? where id = ?';
                var values = [fileName, userID];
                connection.query(queryString, values, function(err, res) {
                        console.log(res);
                        if (err) reject(err);
                        else resolve(res);
                    }) //end of connection.query
            }) // end of return new Promise for addResume
    }, // end of addResume 

    addSkill: function(table, userID, skill, cb) {
        console.log('following 3 logs are inside the addSkill orm function');
        console.log('table: ' + table);
        console.log('userID: ' + userID);
        console.log('skill: ' + skill);
        return new Promise(function(resolve, reject) {
                return new Promise(function(resolve, reject) {
                    console.log('inside 2nd promise inside addskill');
                    var queryString = "select id from nd94bu2dunh75gd2.skills where skill = '" + skill + "'"
                    console.log(queryString);
                    connection.query(queryString, function(err, res) {
                        if (err) reject(err)
                        else {
                            var skillID = res;
                            var insertString = 'INSERT INTO nd94bu2dunh75gd2.' + table + ' (skillID, empID) values (?,?)';
                            var insertValues = [skillID[0].id, userID]
                                // console.log(insertString);
                                // console.log(insertValues);
                            connection.query(insertString, insertValues, function(err, res) {
                                if (err) reject(err);
                                else resolve(res);
                            })
                            resolve(res);
                        }
                    })
                })
            }) // end of return new Promise for addskill
    }, // end of addSkill

    skillOptions: function(userID, cb) {
        // return new Promise(function(resolve, reject) {
        var queryString = 'select skill from nd94bu2dunh75gd2.skills where skill not in (select skill from nd94bu2dunh75gd2.skills s left join nd94bu2dunh75gd2.emp_skills e on s.id = e.skillID where empID = ' + userID + ')';
        console.log(queryString);
        connection.query(queryString, function(err, res) {
                if (err) throw err;
                return cb(res);
            }) // end of connection.query
            //  }) // end of return new Promise
    }, // end of skillOptions

    getSkills: function(empID, cb) {
        return new Promise(function(resolve, reject) {

                // select * from skills s left join emp_skills e on s.id = e.skillID where empID = 1;
                var queryString = 'SELECT * from nd94bu2dunh75gd2.skills s left join nd94bu2dunh75gd2.emp_skills e on s.id = e.skillID where e.empID = ?';
                console.log(queryString);
                connection.query(queryString, [empID], function(err, res) {
                        if (err) throw err;
                        return cb(res);
                        // if (err) reject(err);
                        //  else resolve(res);
                    }) //end of connection.query
            }) // end of return new Promise for getSkills
    }, // end of getSkills

    addSocialMedia: function(table, empID, facebook, twitter, github, stackoverflow, linkedin) {
        return new Promise(function(resolve, reject) {
                var queryString = 'UPDATE nd94bu2dunh75gd2.' + table + ' SET facebook = ? , twitter = ? , github = ? , stackoverflow = ? , linkedin = ? where userid = ?';
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
        var queryString = 'SELECT * FROM nd94bu2dunh75gd2.' + table + ' WHERE userid = ' + userID;
        console.log(queryString);
        
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getSocialMedia


    getSkillLevels: function( userID, cb) {
        var queryString = 'SELECT * FROM nd94bu2dunh75gd2.skill_level WHERE empID = ' + userID;
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            return cb(res);
        }); // end of connection query
    }, // end of getSocialMedia

     getPortfolio: function(empID, cb) {
        var queryString = 'SELECT * from nd94bu2dunh75gd2.portfolio where id = ?';
        connection.query(queryString, [empID], function(err, res) {
            if (err) throw err;
            return cb(res);
        })
    }
}; // end of orm
module.exports = orm;
