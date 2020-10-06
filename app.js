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
  port: 8080
});

connection.connect(function () {
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

async function start() {
  //list off employees and mangers
  // getEmployee();
  // getManager();
  // getDepartment();
  // getRole();

  //user input options
  var answers = await inquirer.prompt(introQuestions);
  switch (answers.action) {
    case "View all Employees":
      viewAll();
      break;
    case "View all Employees by department":
      viewDepartment();
      break;
    case "view all Employees by Manager":
      viewManager();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add department":
      addDepartmet();
      break;
    case "Add Role":
      addRole();
      break;
    case "Update Employee Role":
      updateEmpRole();
      break;
    default:
      connection.end();
  }
}

//CLI Questions
const introQuestions = [{
  name: "intro",
  type: "list",
  message: "What would Thy like to do?",
  choices: [
    "View all Employees",
    "View all Employees by department",
    "view all Employees by Manager",
    "Add Employee",
    "Add department",
    "Add Role",
    "Update Employee Role",
    "Exit"
  ],
}, ];