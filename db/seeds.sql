use tech_db;

-- creating employees
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Steve','Jobs',true,'111 Apple Street','Palo Altos', 'CA', 90210);
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Mark','Cuban','0', '222 Mavericks Ave', 'Dallas', 'TX', 70211);
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Elon','Musk','0', '333 First Street', 'San Francisco', 'CA', 92311 );

-- list of possible skills available
INSERT INTO skills VALUES ('HTML');
INSERT INTO skills VALUES ('CSS');
INSERT INTO skills VALUES ('JavaScript');
INSERT INTO skills VALUES ('Node');
INSERT INTO skills VALUES ('JQuery');

-- Steve Jobs
INSERT INTO emp_skills (skillID, empID) VALUES (1, 1);
INSERT INTO emp_skills (skillID, empID) VALUES (2, 1);
INSERT INTO emp_skills (skillID, empID) VALUES (5, 1);
-- Mark Cuban
INSERT INTO emp_skills (skillID, empID) VALUES (4, 2);
-- Elon Musk
INSERT INTO emp_skills (skillID, empID) VALUES (1, 3);
INSERT INTO emp_skills (skillID, empID) VALUES (2, 3);
INSERT INTO emp_skills (skillID, empID) VALUES (3, 3);
INSERT INTO emp_skills (skillID, empID) VALUES (4, 3);
INSERT INTO emp_skills (skillID, empID) VALUES (5, 3);


