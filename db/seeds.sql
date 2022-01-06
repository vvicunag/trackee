USE trackee_db;
INSERT INTO departments (dep_name) 
VALUES ("Accounting"),
("Finance"),
("Marketing");

INSERT INTO roles (title, salary, department_id) 
VALUES ("Head of finance", 100000, 2),
("Advisor", 75000, 2),
("Project Lead", 65000, 3),
("Analyst", 90000, 3),
("Accountant", 70000, 1),
("Head of accounting", 90000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Johnny", "Cash", 6, NULL),
("Peter", "Loan", 5, 1),
("Franziska", "Poublie", 4, NULL);



