const express = require('express');

//Exports connection the application to MySQL database
const db = require('./db/connection');

//require the directory where we have all the routes
const apiRoutes = require('./routes/apiRoutes');

//PORT designation and app expression
const PORT = process.env.PORT || 3005;
const app = express();

//Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//After Express middleware
/*Use apiRoutes; by adding the /api prefix here, we can remove it from
the individual route expressions after we move them to their new home.*/
app.use('/api', apiRoutes);

/*
Route to handle user requests that aren't supported by the app
Because this is a catchall route, its placement is very important.
If we place this route above other routes, this route will override
all others—so make sure that this is the last one.
*/
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});