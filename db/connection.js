//Modularize the database connection logic

//Import the mysql2 package
const mysql = require('mysql2');

//Code that connects the application to the MySQL database
const db = mysql.createConnection(
  {
    host: 'localhost',
    //Your MySQL username,
    user: 'root',
    //Your MySQL password
    password: 'Luz3%E&NB/x.ENS',
    database: 'election'
  },
  console.log('Connected to the election database.')
);


module.exports = db;