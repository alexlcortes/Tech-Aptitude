/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../config/connection');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `email` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `firstName` CHAR(60) NOT NULL, \
    `lastName` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
