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
db.connect(err => {
  if (err) throw err;
  console.log(`Connected to the employees_db database!`);
});

