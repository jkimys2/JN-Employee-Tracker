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
  console.log(`Connected to the employees_db database!`);
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
  const sql = "SELECT * FROM roles;";
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

// Function to exit prompts
const exit = () => {
  console.log("Goodbye!");
  process.exit();
};
