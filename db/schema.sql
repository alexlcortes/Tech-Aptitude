CREATE DATABASE tech_db;
USE tech_db;

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

CREATE TABLE portfolio
(
id INT NOT NULL,
title varchar (100),
startDate varchar (100),
endDate varchar (100),
description varchar (1000),
skillsUsed varchar(100),
photo varchar(500) DEFAULT 'http://lorempixel.com/output/abstract-q-c-200-200-9.jpg'
);


CREATE TABLE users 
(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password CHAR(60) NOT NULL,
    firstName varchar(60) NOT NULL,
    lastName varchar (60) NOT NULL,
	street_address varchar (60),
    city varchar (60),
    state varchar (2),
    zip INT,
    profile_img varchar(50),
    resume varchar(50),
    mobile_number varchar(50),
    
    PRIMARY KEY (id),
        
	
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX email_UNIQUE (email ASC)
);

CREATE TABLE social_media 
(
    userid INT(11) NOT NULL,
    facebook varchar(100),
    twitter varchar(100),
    github varchar(100),
    stackoverflow varchar(100),
    linkedin varchar(100),
);

CREATE TABLE skill_level 
(
    userid INT(11) NOT NULL,
    HTML varchar(100),
    CSS varchar(100),
    JavaScript varchar(100),
    Node varchar(100),
    JQuery varchar(100),
);
