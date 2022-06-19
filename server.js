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
console.log(`Connected to the employee_db database.`)
);

