const express = require('express');

//Import the mysql2 package
const mysql = require('mysql2');

//PORT designation and app expression
const PORT = process.env.PORT || 3005;
const app = express();

//Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World!'
//   });
// });

/*Query the database with query() method to test the connection
Once this method executes the SQL command, the callback function
captures the responses from the query in two variables: err is the
error response amd rows is the database query response
*/
db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});
/*
The object that is returned from the application is an array of
objects, with each object representing a row of the candidates table.
*/

/*
Route to handle user requests that aren't supported by the app
Because this is a catchall route, its placement is very important.
If we place this route above other routes, this route will override
all others—so make sure that this is the last one.
*/
app.use((req, res) => {
  res.status(404).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});