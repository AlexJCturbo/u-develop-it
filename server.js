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

//Get a single candidate
db.query(`SELECT * FROM candidates WHERE id = 4`, (err, row) => {
  if(err) {
    console.log(err);
  }
  console.log(row);
});

//Delete a candidate
// ? = placeholder
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if(err) {
//     console.log(err);
//   }
//   console.log(result);
// })
/*
The DELETE statement has a question mark (?) that denotes a placeholder,
making this a prepared statement. A prepared statement can execute the
same SQL statements repeatedly using different values in place of the
placeholder.
*/

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
              //The four placeholders must match the four values in params, so we must use an array.
const params = [7, 'Edward', 'Bellamy', 0];
/*
We can't insert another candidate with id 1 again, because that id is
already taken. This is why we received the error Duplicate entry '1'
for key 'candidates.PRIMARY'. This is the PRIMARY KEY constraint at
work, protecting the table from duplicate ids.
*/

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

/*
Route to handle user requests that aren't supported by the app
Because this is a catchall route, its placement is very important.
If we place this route above other routes, this route will override
all others—so make sure that this is the last one.
*/
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});