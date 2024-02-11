// Import modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Set up connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: "employees_db",
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log(`Now connected to the Employee Tracker!`);
  mainPrompt();
});

// Inquirer prompts
const mainPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "tracker",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Exit",
        ],
      },
    ])
    .then(({ tracker }) => {
      switch (tracker) {
        case "View All Departments":
          viewAllDept();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add a Department":
          addDept();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee's Role":
          updateEmployee();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};

// Function to view all the departments
const viewAllDept = () => {
  const sql = "SELECT * FROM department;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    mainPrompt();
  });
};

// Function to view all roles
const viewAllRoles = () => {
  const sql =
    "SELECT roles.id, roles.title, department.department_name, roles.salary FROM roles LEFT JOIN department ON department.id = roles.department_id;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    mainPrompt();
  });
};

// Function to view all employees
const viewAllEmployees = () => {
  const sql =
    "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, roles.title AS job_title, department.department_name AS department, roles.salary, employee.manager_id AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    mainPrompt();
  });
};

// Function to add a new department
const addDept = () => {
  inquirer
    .prompt({
      type: "input",
      name: "newDept",
      message: "Please enter the department name you would like to add:",
      validate: (deptInput) => {
        if (deptInput) {
          return true;
        } else {
          console.log("You must enter a department name!");
          return false;
        }
      },
    })
    .then(({ newDept }) => {
      const sql = "INSERT INTO department (department_name) VALUES (?);";
      const params = newDept;
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllDept();
        mainPrompt();
      });
    });
};

// Function to add a new role
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "Please enter the job title you would like to add:",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("You must enter a job title!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newRoleSalary",
        message: "What is the salary of the role?",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("You must enter a salary for this role!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "newRoleDept",
        message: "Which department does this role belong to?",
        choices: [],
      },
    ])
    .then(({ newRole }) => {
      const sql = "INSERT INTO roles (title, salary) VALUES (?);";
      const params = newRole;
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllRoles();
        mainPrompt();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirst",
        message: "What is the new employee's first name?",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("You must enter a name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeLast",
        message: "What is the new employee's last name?",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("You must enter a name!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What is the new employee's role?",
        choices: [],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the new employee's manager?",
        choices: [],
      },
    ])
    .then(({ employeeFirst, employeeLast, employeeRole, employeeManager }) => {
      const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
      let params = employeeFirst, employeeLast, employeeRole, employeeManager;
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        viewAllEmployees();
        mainPrompt();
      });
    });
};
// Function to exit prompts
const exit = () => {
  console.log("Goodbye!");
  process.exit();
};
