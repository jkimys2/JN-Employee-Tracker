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
    "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, roles.title AS job_title, department.department_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;";
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
        console.log(`Added ${newDept} to the database!`);
        viewAllDept();
        mainPrompt();
      });
    });
};

// Function to add a new role
const addRole = () => {
  const sql = "SELECT * FROM department;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const departmentList = result.map((department) => {
      return { name: department.department_name, value: department.id };
    });
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
          choices: departmentList,
        },
      ])
      .then(({ newRole, newRoleSalary, newRoleDept }) => {
        const sql =
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";
        // let params = newRole,
        //   newRoleSalary,
        //   newRoleDept;
        db.query(sql, [newRole, newRoleSalary, newRoleDept], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`Added ${newRole} to the database!`);
          viewAllRoles();
          mainPrompt();
        });
      });
  });
};

// Function to add a new employee
const addEmployee = () => {
  const sql =
    "SELECT roles.id, roles.title, department.department_name, roles.salary FROM roles LEFT JOIN department ON department.id = roles.department_id;";
  db.query(sql, (err, roles) => {
    if (err) {
      console.log(err);
      return;
    }
    const sql =
      "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, roles.title AS job_title, department.department_name AS department, roles.salary, employee.manager_id AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id;";
    db.query(sql, (err, employees) => {
      if (err) {
        console.log(err);
        return;
      }
      const employeeList = employees.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      const rolesList = roles.map((role) => {
        return { name: role.title, value: role.id };
      });
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
            choices: rolesList,
          },
          {
            type: "list",
            name: "employeeManager",
            message: "Who is the new employee's manager?",
            choices: employeeList,
          },
        ])
        .then(
          ({ employeeFirst, employeeLast, employeeRole, employeeManager }) => {
            const sql =
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";
            // let params = employeeFirst,
            //   employeeLast,
            //   employeeRole,
            //   employeeManager;
            db.query(
              sql,
              [employeeFirst, employeeLast, employeeRole, employeeManager],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log(
                  `Added ${employeeFirst} ${employeeLast} to the database!`
                );
                viewAllEmployees();
                mainPrompt();
              }
            );
          }
        );
    });
  });
};

// Function to update an employee
const updateEmployee = () => {
  const sql =
    "SELECT roles.id, roles.title, department.department_name, roles.salary FROM roles LEFT JOIN department ON department.id = roles.department_id;";
  db.query(sql, (err, roles) => {
    if (err) {
      console.log(err);
      return;
    }
    const sql =
      "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, roles.title AS job_title, department.department_name AS department, roles.salary, employee.manager_id AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id;";
    db.query(sql, (err, employees) => {
      if (err) {
        console.log(err);
        return;
      }
      const employeeList = employees.map((employee) => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
        };
      });
      const rolesList = roles.map((role) => {
        return { name: role.title, value: role.id };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "updatedEmployee",
            message: "Which employee would you like to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "updatedRole",
            message:
              "What role would you like to assign the selected employee?",
            choices: rolesList,
          },
        ])
        .then(({ updatedEmployee, updatedRole }) => {
          const sql = "UPDATE employee SET role_id = (?) WHERE id = (?);";
          db.query(sql, [updatedRole, updatedEmployee], (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(
              `Updated ${updatedEmployee} to the ${updatedRole} position!`
            );
            viewAllEmployees();
            mainPrompt();
          });
        });
    });
  });
};

// Function to exit prompts
const exit = () => {
  console.log("Goodbye!");
  process.exit();
};
