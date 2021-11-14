INSERT INTO department(name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Junior Avenger", 100000, 1), ("Avenger", 125000, 1), ("Leader", 350000, 5), ("Second in Command", 300000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Natasha', 'Romanoff', 2, 2), 
('Steve', 'Rogers', 3, NULL),
('Thor', 'Odinson', 2, 2), 
('Sam', 'Wilson', 1, 2),
('Clint', 'Barton', 2, 2), 
('Bruce', 'Banner', 2, 2), 
('Tony', 'Stark', 4, 2), 
('Scott', 'Lang', 1, 7),
('Wanda', 'Maximoff', 2, 7),
('James', 'Rhodes', 1, 7);