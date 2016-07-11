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
empID INT not null,
primary key (id)
);

CREATE TABLE skills
(
id INT NOT NULL AUTO_INCREMENT,
skill varchar(50),
primary key (id) 
);