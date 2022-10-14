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