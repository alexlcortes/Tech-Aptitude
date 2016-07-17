use tech_db;

-- creating employees
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Steve','Jobs',true,'111 Apple Street','Palo Altos', 'CA', 90210);
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Mark','Cuban','0', '222 Mavericks Ave', 'Dallas', 'TX', 70211);
INSERT INTO employees (fname, lname, currently_searching, street_address, city, state, zip) VALUES ('Elon','Musk','0', '333 First Street', 'San Francisco', 'CA', 92311 );

-- list of possible skills available
INSERT INTO skills (skill) VALUES ('HTML');
INSERT INTO skills (skill) VALUES ('CSS');
INSERT INTO skills (skill) VALUES ('JavaScript');
INSERT INTO skills (skill) VALUES ('Node');
INSERT INTO skills (skill) VALUES ('JQuery');

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

--  assigning skills to existing employees
INSERT INTO skill_level (skill_level, empID, skillsID) VALUES ('Junior',1,1);
INSERT INTO skill_level (skill_level, empID, skillsID) VALUES ('Mid-Level',1,2);
INSERT INTO skill_level (skill_level, empID, skillsID) VALUES ('Senior',2, 4);
INSERT INTO skill_level (skill_level, empID, skillsID) VALUES ('Junior', 3, 4);
INSERT INTO skill_level (skill_level, empID, skillsID) VALUES ('Mid-Level', 3, 5);

-- creating questions into test table
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER) VALUES (
