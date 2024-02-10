// Import modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: "employees_db",
});

db.connect(err => {
  if (err) throw err;
  console.log(`Connected!`);
});
