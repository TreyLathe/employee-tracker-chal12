INSERT INTO department (name)
VALUES  ('Sales'), 
        ('Engineering'),
        ('Finance'), 
        ('Legal');

INSERT INTO role (title, salary, department_id)    
VALUES  ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Luke', 'Skywalker', 1, NULL),
        ('ObiWan', 'Kenobi', 2, 1),
        ('Princess', 'Leia', 3, NULL),
        ('Yoda', 'Yoda', 4, 3),
        ('Han', 'Solo', 5, NULL),
        ('Darth', 'Vader', 6, 5),
        ('Chew', 'Bacca', 7, 5),
        ('R2', 'D2', 7, 7);
