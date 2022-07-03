const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTable = require('console.table');
require('dotenv').config();
const roles = [];
const roleId = [];
const newRole = [];
const newRoleId = [];
const mgr = [];
const mgrId = [];
const dpt = [];
const dptIdNum = [];
const emp = [];
const empIdNum = [];



const db_connect = mysql.createConnection(
    {
      host: 'localhost',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
},
console.log(`connected to employee tracker.`)
);

function start (){
  inquirer.prompt([
    {
      type: 'list',
      message: 'What can I help with today?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
      ],
      name: 'choice'
    }
  ]).then(answers => {
    switch(answers.choice){
      case 'View All Employees':
        employeeInfo();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployee();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        allDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Quit':
        db_connect.end;
        break;
    }
  })
}
