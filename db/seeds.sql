INSERT INTO
    department (department_name)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ("Engineering Manager", "140000", 1),
    ("Software Engineer", "120000", 1),
    ("Finance Manager", "150000", 2),
    ("Accountant", "120000", 2),
    ("Senior Attorney", "175000", 3),
    ("Junior Attorney", "130000", 3),
    ("Sales Manager", "100000", 4),
    ("Sales Associate", "85000", 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Miranda", "Bailey", 5, null),
    ("Meredith", "Grey", 1, null),
    ("Richard", "Webber", 7, null),
    ("Christina", "Yang", 3, null),
    ("Alex", "Karev", 8, 3),
    ("George", "O'Malley", 6, 1),
    ("Derek", "Shepherd", 4, 4),
    ("Izzie", "Stephens", 2, 2);