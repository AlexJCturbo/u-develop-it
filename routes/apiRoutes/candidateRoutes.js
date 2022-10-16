//Modularize the routes

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//ROUTES FOR CANDIDATES

/*Query the database with query() method to test the connection
Once this method executes the SQL command, the callback function
captures the responses from the query in two variables: err is the
error response amd rows is the database query response
*/

//GET all candidates
//we use app to create endpoints
//originally app.get('/api/candidates/', (req, res) => {
router.get('/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    /*Instead of logging the result, rows, from the database,
    we'll send this response as a JSON object to the browser, using
    res in the Express.js route callback.*/
    res.json({
      message: 'success',
      data: rows
    });
  });
});
/*
The object that is returned from the application is an array of
objects, with each object representing a row of the candidates table.
*/

//GET a single candidate
//originally app.get('/api/candidate/:id', (req, res) => {
router.get('/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
              AS party_name
              FROM candidates
              LEFT JOIN parties
              ON candidates.party_id = parties.id
              WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      //Error status code changed to 400 to notify client the request wasn't accepted.
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//DELETE a candidate using HTTP request method delete()
// ? = placeholder
//originally app.delete('/api/candidate/:id', (req, res) => {
router.delete('/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        //result.affectedRows will verify whether any rows were changed
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

/*
The DELETE statement has a question mark (?) that denotes a placeholder,
making this a prepared statement. A prepared statement can execute the
same SQL statements repeatedly using different values in place of the
placeholder.
*/

//POST a candidate
//originally app.post('/api/candidate', ({ body }, res) => {
router.post('/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
    //The three placeholders must match the four values in params, so we must use an array.
  const params = [body.first_name, body.last_name, body.industry_connected];
  //MySQL will autogenerate the id and relieve us of the responsibility to know which id is available to populate.
/*
We can't insert another candidate with id 1 again, because that id is
already taken. This is why we received the error Duplicate entry '1'
for key 'candidates.PRIMARY'. This is the PRIMARY KEY constraint at
work, protecting the table from duplicate ids.
*/
  //Uses the parameters sql and params to create the candidate
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

//PUT request to update candidates party
//originally app.put('/api/candidate/:id', (req, res) => {
router.put('/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ? 
              WHERE id = ?`;
  //using a parameter for the candidate's id with req.params.id
  const params = [req.body.party_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'updated',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

module.exports = router;