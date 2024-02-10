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
    ("Engineering Manager", "140,000", 1),
    ("Software Engineer", "120,000", 1),
    ("Finance Manager", "150,000", 2),
    ("Accountant", "120,000", 2),
    ("Senior Attorney", "175,000", 3),
    ("Junior Attorney", "130,000", 3),
    ("Sales Manager", "120,000", 4),
    ("Sales Associate", "75,000", 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Miranda", "Bailey", 5),
    ("Meredith", "Grey", 1),
    ("Alex", "Karev", 8, 7),
    ("George", "O'Malley", 6, 1),
    ("Derek", "Shepherd", 4, 8),
    ("Izzie", "Stephens", 2, 2),
    ("Richard", "Webber", 7),
    ("Christina", "Yang", 3);