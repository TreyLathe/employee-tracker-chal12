# EMPLOYEE TRACKER
Table of Contents:
- [User Story/Challenge Goal](#user-storychallenge-goal)
- [Resources Used & Credits](#resources-user--credits)
- [Relevant Links](#relevant-links)
- [Screenshots & Screencasts](#screenshots--screencasts)
- [Usage and Comments](#usage--comments)
- [Future Direction and Contributing](#future-directions-and-contributing)
- [Tests](#tests)

## USER STORY/CHALLENGE GOAL:
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## RESOURCES USED && CREDITS:
- Class instruction and office hours, Kyle and Drew, specifically for assistance understanding CRUD and equivelent functions  .
- W3School sections on mysql, express and try/catch, Completed node.js/mysql tutorial
- Student interactions and questions during class
- AI helping understanding mysql/promise functionality


## RELEVANT LINKS:
- Repository: https://github.com/TreyLathe/employee-tracker-chal12

- Deployed Site:  N/A

## SCREENSHOTS &&/|| SCREENCASTS:
Screencast: https://drive.google.com/file/d/1v6f_p8cKtFOYSoM4aSdEui4ztyC9vqe5/view


## USAGE && COMMENTS:

>GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role, also list all employees by manager.

Options appear as listed above.

>WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

Formatted table of department names and ids is shown.

>WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

Table of job title, role id, department and salary are shown.

>WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

Table is shown of all employees including id, names, salaries, and managers is shown.

>WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

Choosing the option to add a department prompts user to add new department. New department is then added to the correct table. 

>WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

Choosing the option to add a role prompts user to add new role including name, salary and department. New role is then added to the correct table.

>WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

Choosing the option to add an employee prompts user to add new employee including name, role and manager. New employee is then added to the correct table. Database is updated.

>WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

CHoosing the option to update an employee role, prompts user to choose employe ID and new role ID. Database is updated. 

>WHEN I choose to list employees by manager,
THEN a table of employees is shown organized by manager.

Choosing this option shows a list of all employees organized by manager. 

>WHEN I choose a department budget, 
THEN a sum of all salaries in that department are shown.

Sums correctly shown.

## FUTURE DIRECTIONS AND CONTRIBUTING

- Add more functionality   
    - add more functionality to list data in various manners
    - add more functionality to modify data
    - add web interface functionality 
- JEST test code
    

## TESTS

Currently, no Jest tests, console logs help with testing, type node server.js in appropriate directory to test functionality of application.