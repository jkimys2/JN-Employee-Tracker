# JN-Employee-Tracker


## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Links](#links)


## Description

Through this project, I was able to create a command-line application that helps users manage their employee database. It allows users to navigate through their employee database, view information, and even add and/or modify data! This challenge was completed by following the acceptance criterias listed below:


```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

This project was completed with Node.js, Inquirer, and MySQL2. It was created in order to help employers navigate and modify information within their employee database with ease. By running the code ```node server.js```, the user is connected to the employee database, where they are able to navigate through different options such as view all departments, add an employee, and more!

This project did not come with any starter code. Everything in this application was built from scratch!


## Installation

In order to navigate through the employee database, you will need the following:

- Visual Studio Code <br>
- Node.js <br>
- And you will need to install the dependencies in the package.json file!


## Usage

Once you have the file in VS Code, you will need to install the dependencies by 
running ```npm install``` in the integrated terminal.


In order to navigate through the employees database, you will need to open the integrated terminal. From there, you will type ```node server.js``` to run the file. Once you do so, you will be connected to the database, and you will be able to navigate through the different options. You can view all of the departments, view all ofthe roles in the departments, view all of the employees, add a department, role, or employee, or even update an employee's role! Finally, you can exit the database by choosing the exit option.

Here is a snippet on how this application works:
![gif]()

## Credits

Thank you Chris B. for all your help! 😊👍
