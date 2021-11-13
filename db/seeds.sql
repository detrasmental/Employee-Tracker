INSERT INTO department(department_name)
VALUES
("God/Goddess"), 
("Gadget User"), 
("Magic User"), 
("Powerhouse"), 
("Shapeshifter");

INSERT INTO role(title, salary, department_id)
VALUES
("Leader", 100000, 1), 
("Second in Command", 75000, 1), 
("Support", 50000, 3), 
("On Call", 25000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES
    ('Steve', 'Rogers', 1, 1)
    ('Tony', 'Stark', 1 , 2),
    ('Thor', 'Odinson', null, 3),
    ('Bruce', 'Banner', null, 4),
    ('Natasha', 'Romanoff', null, 5),
    ('Clint', 'Barton', null, 6),
    ('Wanda', 'Maximoff', null, 7),
    ('Sam', 'Wilson', null, 8),
    ('Scott', 'Lang', null, 9),
    ('James', 'Rhodes', null, 10)
;
	