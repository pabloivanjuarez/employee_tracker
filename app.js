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
    "View departments, employees, roles",
    "Add department, employee, role",
    "Update Employee Role",
    "Exit"
  ]
}];

async function start() {
  //user input options
  var resp = await inquirer.prompt(introQuestions);
  switch (resp.action) {
    case "View departments, employees, roles":
      view();
      break;
    case "Add department, employee, role":
      add();
      break;
    case "update employee role":
      updateEmpRole();
      break;
    case "Exit":
      connection.end();
  }
}