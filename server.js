require('dotenv').config();



const db_connect = mysql.createConnection(
    {
      host: 'localhost',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
},
console.log(`Connected to the employee_db database.`)
);