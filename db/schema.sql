CREATE DATABASE tech_db;
USE tech_db;

CREATE TABLE employees

(
id int NOT NULL AUTO_INCREMENT,
fname varchar(255) NOT NULL,
lname varchar(255) NOT NULL,
currently_searching boolean,
street_address varchar(50), 
city varchar(50),
state varchar(2),
zip INT (11),	
PRIMARY KEY (id)
);


CREATE TABLE emp_skills
(
id int not null auto_increment,
skillID INT NOT NULL,
empID INT NOT NULL,
primary key (id)
);

CREATE TABLE skills
(
id INT NOT NULL AUTO_INCREMENT,
skill varchar(50),
primary key (id) 
);

CREATE TABLE skill_level
(
id INT NOT NULL AUTO_INCREMENT,
skill_level varchar(10),
empID INT NOT NULL,
skillsID INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE test
(
id INT NOT NULL AUTO_INCREMENT,
skillID INT NOT NULL, 
question INT NOT NULL,
weight INT NOT NULL,
OPT1 varchar (100),
OPT2 varchar (100),
OPT3 varchar (100),
OPT4 varchar (100),
ANSWER varchar(100),
PRIMARY KEY (id)
);


CREATE TABLE users 
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password CHAR(60) NOT NULL,
    firstName varchar(60) NOT NULL,
    lastName varchar (60) NOT NULL,
        PRIMARY KEY (id),
	
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX email_UNIQUE (email ASC)
);
