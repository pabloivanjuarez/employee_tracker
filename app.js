const mysql = require("mysql");
const inquirer = require("inquirer");
const {
  connect
} = require("http2");
const {
  table
} = require("console");
const {
  allowedNodeEnvironmentFlags
} = require("process");

//result queries
let getD = "SELECT * FROM department"
let getEmp = "SELECT * FROM employee"
let getR = "SELECT * FROM roles"
const connection = mysql.createConnection({
  user: "ceo",
  password: "leboss321",
  database: "emptracker",
  host: "localhost",
  port: 3306
});

connection.connect(function (err) {
  if (err) throw err;
  console.table(`
============================================================
|                                                          |
|                                                          |
|      ______                 _                            |
|     |   __/ _ __ ___  _ __ | | ___  _   _  ___  ___      |
|     |   _| |  _ '  _ \\  _ \\| |/ _ \\| | | |/ _ \\/ _ \\     |
|     |  |___  | | | | | |_) | | (_) | |_| |  __/  __/     |
|     |______|_| |_| |_|  __/|_|\\___/\\___, |\\___|\\___|     |
|                      |__|           |___/                |
|                                                          |
|                                                          |
|                   >>>----TRACKER---->                    |
|                                                          |
|                                                          |
============================================================
  `)
  start();
});

//CLI introductory Questions
const introQuestions = [{
  name: "action",
  type: "list",
  message: "What would Thy like to do?",
  choices: [
    "View departments, employees, roles?",
    "Add department, employee, role?",
    "Update employee role?",
    "Exit"
  ]
}];

async function start() {
  //user input options
  var resp = await inquirer.prompt(introQuestions);
  switch (resp.action) {
    case "View departments, employees, roles?":
      view();
      break;
    case "Add department, employee, role?":
      add();
      break;
    case "Update employee role?":
      updateEmpRole();
      break;
    case "Exit":
      connection.end();
  }
}

//View departments, employees, roles 
function view() {
  inquirer.prompt([{
    name: "viewQ",
    type: "rawlist",
    message: "Where would thy like to peer?",
    choices: ["departments", "employees", "roles"]
  }]).then(function (resp) {
    // view departments
    if (resp.viewQ === "departments") {
      connection.query(getD, function (err, res) {
        if (err) throw err;
        //department query results
        console.table(res);
        //restart CLI
        start()
      });
    } else if (resp.viewQ === "employees") {
      connection.query(getEmp, function (err, res) {
        if (err) throw err;
        //employee query results
        console.table(res);
        // restart CLI
        start()
      });
    } else if (resp.viewQ === "roles") {
      connection.query(getR, function (err, res) {
        if (err) throw err;
        //roles query results
        console.table(res);
        //restart CLI
        start()
      });
    }
  })
}

// Add new department, employee, role
function add() {
  inquirer.prompt([{
    name: "addQ",
    type: "rawlist",
    message: "Which table would thy like to add to?",
    choices: ["Add new department", "Add new employee", "Add new role"]
  }]).then(function (resp) {
    if (resp.addQ === "Add new department") {
      addDepartment();
    } else if (resp.addQ === "Add new employee") {
      addEmployee();
    } else if (resp.addQ === "Add new role") {
      addRole
    }
  });
}

function addDepartment() {
  inquirer.prompt([{
    name: "addD",
    type: "input",
    message: "What is thy department which thou wish to add?"
  }]).then(function (resp) {
    let query = "INSERT INTO department (branches) VALUES (?)";
    console.log(resp);
    connection.query(query, [resp.addD],
      function (err, res) {
        if (err) throw err;
      });
    //show new department table
    connection.query(getD, function (err, res) {
      if (err) throw err;
      console.table(res);
      // restart CLI
      start()
    });
  });
}