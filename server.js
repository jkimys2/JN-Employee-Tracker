// Import modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config;

// Initialize port
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: DBHOST,
    user: DBUSER,
    password: DBPASSWORD,
    database: "employees_db",
  },
  console.log(`Connected to employees_db database!`)
);
