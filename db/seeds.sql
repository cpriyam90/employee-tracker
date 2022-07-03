INSERT INTO department (name)
VALUES ("Management"),
        ("IT"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1),
        ("Software Engineer", 80000, 2),
        ("Rep", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, NULL),
        ("Jim", "Halpert", 3, 1),
        ("Sadiq", "M", 2, 1);
