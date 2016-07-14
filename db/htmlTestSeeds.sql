-- creating questions into test table
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER) 
	VALUES ('HTML', 'What does HTML stand for?',
	1, 'Hit The Mother Load', 'How to Make Language','Hypertext Markup Language', 'Hyper Text Media Language', 
    'Hypertext Markup Language');
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER) 
	VALUES ('HTML', 'What goes into the <head> section of a html document?',
    1, 'Title', 'Link to CSS Page',' Menu Header', 'Options A and B','All of the Above', 
    'Options A & B');
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML', 'What common tag is used for a logical container?',
    1, '<container> </container>', '<body> </body>', '<div> </div>', '<logicContainer> </logicContainer>'
    '<div> </div>');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML', 'What is the correct HTML for referring to an external style sheet?',
    2, '<link rel="stylesheet" type="text/css" href="mystyle">', '<style src="mystyle.css">',
    '<stylesheet>mystyle.css</stylesheet>','<stylesheet>mystyle.css</stylesheet>',
    '<link rel="stylesheet" type="text/css" href="mystyle.css">',
    '<link rel="stylesheet" type="text/css" href="mystyle">');
    
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML', 'Which HTML attribute is used to define inline styles?', 
    2, 'Font', 'Styles', 'Style', 'Class',
    'Style');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','What is the correct HTML5 element for playing music files?', 
    2, '<sound>', '<audio>', '<mp3>', '<music>',
    '<audio>');
    
    
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','What element is no longer supported in HTML5?',	2,
'<ins>',	
'<menu>',	
'<q>',	
'<font>','<font>'
);
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','In HTML5, onblur and onfocus are:',	3,
'Style attributes',	
'HTML elements',	
'Event attributes',	
'Javascript attributes',	'Event attributes');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','In HTML5, which method is used to get the current location of a user?',	4,
'getUserPosition()',	
'getCurrentPosition()',	
'getPosition()',	
'getCurrentUserPosition()',	'getCurrentPosition()');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','The new HTML5 global attribute, "contenteditable" is used to:',	4,
'Update content from the server',	
'Specify whether the content of an element should be editable or not',	
'Return the position of the first found occurrence of content inside a string',	
'Specifies a context menu for an element. The menu appears when a user right-clicks on the element',	
'Specify whether the content of an element should be editable or not');

    
INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','In HTML5, you can embed SVG elements directly into an HTML page.',	2,
'TRUE',	
'FALSE',	'TRUE');


INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','The <canvas> element in HTML5 is used to:',	4,
'Display database records',	
'Draw graphics',	
'Create draggable elements',	
'Manipulate data in MySQL',	'Draw graphics');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','Which input type defines a slider control?',	4,
'range',	
'slider',
'search',	
'controls',	'range');

INSERT INTO test (skillID, question, weight, OPT1, OPT2, OPT3, OPT4, ANSWER)
	VALUES ('HTML','Which HTML5 element is used to display a scalar measurement within a known range?',	5,
'<measure>',	
'<gauge>',	
'<meter>',	
'<range>',	'<meter>');
