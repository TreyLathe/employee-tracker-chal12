const mysql = require("mysql2/promise");
// const promise = require("mysql2/promise");
const express = require("express");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

//.createConnection() method to create a connection to the database.
mysql;
require("dotenv").config(); // Load environment variables from .env file

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

mysql
  .createConnection(connectionConfig)
  // .then method to handle the promise returned from createConnection()
  .then((connection) => {
    db = connection;
    console.log(`Connected to employees_db database.`);
    start();
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.toString()}`);
    process.exit(1);
  });

const start = async () => {
   // Use inquirer.prompt() method to prompt the user with a list of options.
  try {
    const answer = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "View employees by manager", // "View employees by manager",
        "View department budget",
        "Exit",
      ],
    })
    
      // Use a switch statement to call the appropriate function depending on what the user chooses.
      switch (answer.action) {
        case "View all departments":
          await viewAllDepartments();
          break;

        case "View all roles":
          await viewAllRoles();
          break;

        case "View all employees":
          await viewAllEmployees();
          break;

        case "Add a department":
          await addDepartment();
          break;

        case "Add a role":
          await addRole();
          break;

        case "Add an employee":
          await addEmployee();
          break;

        case "Update an employee role":
          await updateEmployeeRole();
          break;

        case "View employees by manager":
          await employeesByManager();
          break;

        case "View department budget":
          await viewTotalBudget();
          break;

        case "Exit":
          db.end();
          break;
      }
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
};

// Use the .execute() method to execute SQL queries selecting all departments.
// async/await statement to handle asynchronous functions
const viewAllDepartments = async () => {
  console.log("Selecting all departments...\n");
  // try...catch statement to handle errors
  try {
    const [rows, fields] = await db.execute("SELECT * FROM department");
    console.table(rows);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

// Use the .execute() method to execute SQL queries Selecting all roles.
const viewAllRoles = async () => {
  console.log("Selecting all roles...\n");
  try {
    const [rows, fields] = await db.execute("SELECT * FROM role");
    console.table(rows);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

// see above for comments for this function and the one below
const viewAllEmployees = async () => {
  console.log("Selecting all employees...\n");
  try {
    const [rows, fields] = await db.execute("SELECT * FROM employee");
    console.table(rows);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

const addDepartment = async () => {
  console.log("Adding a department...\n");
  const department = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "What is the name of the department?",
  });
  try {
    const [rows, fields] = await db.execute(
      "INSERT INTO department (name) VALUES (?)",
      [department.name]
    );
    console.log(`Added department with id ${rows.insertId}`);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

// Use the .execute() method to execute SQL queries inserting a new role.
const addRole = async () => {
  console.log("Adding a role...\n");
  // Use the .prompt() method to prompt the user for the new role's title, salary, and department id.
  const role = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the role?",
    },
    {
      name: "salary",
      type: "number",
      message: "What is the salary of the role?",
    },
    {
      name: "department_id",
      type: "number",
      message: "What is the department id of the role?",
    },
  ]);
  try {
    const [rows, fields] = await db.execute(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [role.title, role.salary, role.department_id]
    );
    console.log(`Added role with id ${rows.insertId}`);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

// similar to the addRole function above
const addEmployee = async () => {
  console.log("Adding an employee...\n");
  const employee = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the last name of the employee?",
    },
    {
      name: "role_id",
      type: "number",
      message: "What is the role id of the employee?",
    },
    {
      name: "manager_id",
      type: "number",
      message: "What is the manager id of the employee?",
    },
  ]);
  try {
    const [rows, fields] = await db.execute(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [
        employee.first_name,
        employee.last_name,
        employee.role_id,
        employee.manager_id,
      ]
    );
    console.log(`Added employee with id ${rows.insertId}`);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

// similar to the addRole function above
const updateEmployeeRole = async () => {
  console.log("Updating an employee role...\n");
  const employee = await inquirer.prompt([
    {
      name: "id",
      type: "number",
      message: "What is the id of the employee?",
    },
    {
      name: "role_id",
      type: "number",
      message: "What is the role id of the employee?",
    },
  ]);
  try {
    const [rows, fields] = await db.execute(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [employee.role_id, employee.id]
    );
    console.log(`Updated employee with id ${rows.insertId}`);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

//View employees by manager, similar to the addRole function above
const employeesByManager = async () => {
  console.log("Selecting all employees by manager...\n");
  const employee = await inquirer.prompt([
    {
      name: "manager_id",
      type: "number",
      message: "What is the manager id of the employee?",
    },
  ]);
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM employee WHERE manager_id = ?",
      [employee.manager_id]
    );
    console.table(rows);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

//View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
const viewTotalBudget = async () => {
  console.log("Viewing total budget...\n");
  const department = await inquirer.prompt([
    {
      name: "department_id",
      type: "number",
      message: "What is the department id?",
    },
  ]);
  try {
    const [rows, fields] = await db.execute(
      "SELECT SUM(salary) FROM role WHERE department_id = ?",
      [department.department_id]
    );
    console.table(rows);
    start();
  } catch (error) {
    console.error(`Error: ${error.toString()}`);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
