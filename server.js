const mysql = require("mysql2/promise");
// const promise = require("mysql2/promise");
const express = require("express");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employees_db'
  }).then((connection) => {
    db = connection;
    console.log(`Connected to the employees_db database.`);
    start();
  }).catch((error) => {
    console.error(`Error connecting to the database: ${error.toString()}`);
    process.exit(1);
  });
  

const start = () => {
  inquirer
    .prompt({
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
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;

        case "View Employees by Manager":
            EmployeesByManager();
            break;            

        case "Exit":
          db.end();
          break;
      }
     
    });
};

const viewAllDepartments = async () => {
    console.log('Selecting all departments...\n');
    try {
      const [rows, fields] = await db.execute('SELECT * FROM department');
      console.table(rows);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  };

const viewAllRoles = async () => {
    console.log('Selecting all roles...\n');
    try {
      const [rows, fields] = await db.execute('SELECT * FROM role');
      console.table(rows);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  }

const viewAllEmployees = async () => {
    console.log('Selecting all employees...\n');
    try {
      const [rows, fields] = await db.execute('SELECT * FROM employee');
      console.table(rows);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  }

  const addDepartment = async () => {
    console.log('Adding a department...\n');
    const department = await inquirer.prompt({
      name: 'name',
      type: 'input',
      message: 'What is the name of the department?',
    });
    try {
      const [rows, fields] = await db.execute('INSERT INTO department (name) VALUES (?)', [department.name]);
      console.log(`Added department with id ${rows.insertId}`);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  };

const addRole = async () => {
    console.log('Adding a role...\n');
    const role = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?',
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary of the role?',
        },
        {
            name: 'department_id',
            type: 'number',
            message: 'What is the department id of the role?',
        },
        ]);
    try {
      const [rows, fields] = await db.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.title, role.salary, role.department_id]);
      console.log(`Added role with id ${rows.insertId}`);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  }

const addEmployee = async () => {
    console.log('Adding an employee...\n');
    const employee = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of the employee?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the employee?',
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'What is the role id of the employee?',
        },
        {
            name: 'manager_id',
            type: 'number',
            message: 'What is the manager id of the employee?',
        },
        ]);
    try {
      const [rows, fields] = await db.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
      console.log(`Added employee with id ${rows.insertId}`);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  }

const updateEmployeeRole = async () => {
    console.log('Updating an employee role...\n');
    const employee = await inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'What is the id of the employee?',
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'What is the role id of the employee?',
        },
        ]);
    try {
      const [rows, fields] = await db.execute('UPDATE employee SET role_id = ? WHERE id = ?', [employee.role_id, employee.id]);
      console.log(`Updated employee with id ${rows.insertId}`);
      start();
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
    }
  }

    const EmployeesByManager = async () => {
        console.log('Selecting all employees by manager...\n');
        const employee = await inquirer.prompt([
            {
                name: 'manager_id',
                type: 'number',
                message: 'What is the manager id of the employee?',
            },
            ]);
        try {
          const [rows, fields] = await db.execute('SELECT * FROM employee WHERE manager_id = ?', [employee.manager_id]);
          console.table(rows);
          start();
        } catch (error) {
          console.error(`Error: ${error.toString()}`);
        }
      }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });