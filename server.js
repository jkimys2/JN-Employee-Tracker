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
          "View All Employess",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
        ],
      },
    ])
    .then((tracker) => {
      switch (tracker) {
        case "View All Departments":
          viewAllDept();
          break;
        case "View All Roles":
          viewAllDept();
          break;
        case "View All Employees":
          viewAllDept();
          break;
        case "Add a Department":
          viewAllDept();
          break;
        case "Add a Role":
          viewAllDept();
          break;
        case "Add an Employee":
          viewAllDept();
          break;
        case "Update an Employee's Role":
          viewAllDept();
          break;
      }
    });
};
