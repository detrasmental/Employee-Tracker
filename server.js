const mysql = require('mysql')
const inquirer = require('inquirer');
require('console.table');

// BE SURE TO UPDATE THE PASSWORD WITH YOUR OWN CREDENTIALS
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees"
});

// connect to the mysql server and sql database
connection.connect(function (error) {
  if (error) throw error;
  startPrompt();
});

function startPrompt() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Exit"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;
        case "View Employees by Department":
          viewEmployeeByDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employees":
          removeEmployees();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//"View Employees"

function viewEmployee() {
  console.log("Viewing current employees.");

  var query =
  `SELECT employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS 'department', 
  role.salary
  FROM employee, role, department 
  WHERE department.id = role.department_id 
  AND role.id = employee.role_id
  ORDER BY employee.id ASC`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Viewing Current Employees.");

    startPrompt();
  });

}

//View Employees by Department

function viewEmployeeByDepartment() {
  console.log("Viewing employees by department\n");

  var query =
  `SELECT employee.first_name, 
  employee.last_name, 
  department.name AS department
  FROM employee 
  LEFT JOIN role ON employee.role_id = role.id 
  LEFT JOIN department ON role.department_id = department.id
  ORDER BY department.name ASC`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Department view succeed!");

    startPrompt();

  });
 
}


// Make a employee array

function addEmployee() {
  console.log("Adding new employee.")

  var query =
  `SELECT role.id, role.title FROM role`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const pickedRole = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    console.table(res);
    console.log("Role Added");

    promptInsert(pickedRole);
  });
}

function promptInsert(pickedRole) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: pickedRole
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`
      // insert a new item into the database 
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("New Employee added successfully!");

          startPrompt();
        });
     
    });
}

//"Remove Employees" 

function removeEmployees() {
  console.log("Deleting an employee");

  var query =
  `SELECT employee.id, employee.first_name, employee.last_name FROM employee`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log("Deleting employee");

    promptDelete(deleteEmployeeChoices);
  });
}

//Choose who to delete

function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select an employee to delete.",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Deleted!");

        startPrompt();
      });
    
    });
}

//Update Employee Role

function updateEmployeeRole() { 
  employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var query =
  `SELECT employee.id, 
  employee.first_name,
   employee.last_name, 
   role.id AS "role_id" FROM employee, role, 
   department WHERE department.id = role.department_id AND role.id = employee.role_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating role");

  var query =
    `SELECT role.id, 
    role.title, 
    role.salary 
    FROM role role`
  let pickedRole;

  connection.query(query, function (err, res) {
    if (err) throw err;

    pickedRole = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    promptEmployeeRole(employeeChoices, pickedRole);
  });
}

function promptEmployeeRole(employeeChoices, pickedRole) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: pickedRole
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      connection.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Updated successfully!");

          startPrompt();
        });
    });
}




