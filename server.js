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

//sql connection
const db_connect = mysql.createConnection(
    {
      host: 'localhost',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
},
console.log(`connected to employee tracker.`)
);

//function to start prompts when application is invoked
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

function employeeInfo(){
  db_connect.promise().query('SELECT * FROM employee').then(([data]) => {
    console.table(data)
    start();
  }).catch(err => console.log(err))
}

async function addEmployee(){
  await db_connect.promise().query('SELECT * FROM role').then(([data]) => {

    for (let i = 0; i < data.length; i++) {
     roles.push(data[i].title);
     roleId.push(data[i].id);
    }
  }).catch(err => console.log(err))

  await db_connect.promise().query('SELECT * FROM employee').then(([data]) => {
    for (let i = 0; i < data.length; i++) {
     mgr.push(`${data[i].first_name} ${data[i].last_name}`);
     mgrId.push(data[i].id);
    }
    mgr.push('None')
  }).catch(err => console.log(err))

  inquirer.prompt([
    {
      type: "input",
      message: "First Name: ",
      name: "firstName",
    },
    {
      type: "input",
      message: "Last Name: ",
      name: "lastName",
    },
    {
      type: "list",
      message: "Employee Role: ",
      choices: roles,
      name: "role",
    },
    {
      type: "list",
      message: "Employee Manager: ",
      choices: mgr,
      name: 'mgr'
    }
  ]).then(data => {
    if (data.mgr === 'None') {
      let roleId = roles.indexOf(data.role) + 1
      let mgrId = null;
      db_connect.promise().query('INSERT INTO employee SET ?', {first_name: data.firstName, last_name: data.lastName, role_id: roleId, manager_id: mgrId}).then(([data]) => {
        employeeInfo();
        }).catch(err => console.log(err))
    } else{
      let roleId = roles.indexOf(data.role) + 1
      let mgrId = mgr.indexOf(data.mgr) + 1
      db_connect.promise().query('INSERT INTO employee SET ?', {first_name: data.firstName, last_name: data.lastName, role_id: roleId, manager_id: mgrId}).then(([data]) => {
        employeeInfo();
        }).catch(err => console.log(err))
    }
  })
}
