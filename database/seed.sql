USE employee_database;

INSERT INTO department (name)
VALUES('Management'),('Human Resource'),('Finance'),('Engineering'),('Sales'),('legal');


INSERT INTO role ( title , salary , department_id )
VALUES
('Managing Director',300000,1),
('Vice President',200000,1),
('Legal Advisor',70000,6),
('Project Manager',60000,1),
('Recruitment Advisor',30000,2),
('Head of Engineering',90000,4),
('Sales Rep.',50000,5),
('Accountant',70000,3);


INSERT INTO employee (first_name, last_name, role_id ,manager_id) 
VALUES
 ('Joe','DOE',1,NULL),
 ('Jack','Sparrow',2,1),
 ('Doctor','Strange',4,1),
 ('Misty','Ash',7,2),
 ('Brook','Croke',8,2),
 ('Yoda','Master',6,1),
 ('Sang','Woo','3','2'),
 ('Mask','Man',5,2);
