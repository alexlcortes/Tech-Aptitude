CREATE DATABASE tech_db;
USE tech_db;

CREATE TABLE employees

(
id int NOT NULL AUTO_INCREMENT,
emp_fname varchar(255) NOT NULL,
emp_lname varchar(255) NOT NULL,
currently_searching boolean,

PRIMARY KEY (id)
);