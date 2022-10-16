//Modularize the routes

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const { param } = require('./candidateRoutes');

//GET all voters
router.get('/voters', (req, res) => {
  //If want to sort data in descending order (i.e., from Z to A), add DESC keyword (e.g., ORDER BY last_name DESC).
  const sql = `SELECT * FROM voters ORDER BY last_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

/*Other options you might find useful include the following:

GET voters who do not have a last name of Cooper or Jarman
SELECT * FROM voters WHERE last_name != 'Cooper' AND last_name != 'Jarman';

GET voters who have a .edu email address
SELECT * FROM voters WHERE email LIKE '%.edu';

GET only the last created voter
SELECT * FROM voters ORDER BY created_at DESC LIMIT 1;*/


//GET a single voter
router.get('/voter/:id', (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.json(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//POST a voter
/*The ? prepared statements will protect us from malicious data, but we
should also do our best to prevent blank records from being created using
data validation*/
router.post('/voter', ({body}, res) => {
  //Data validation
  const errors = inputCheck(body, 'first_name', 'last_name', 'email');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO voters (first_name, last_name, email)
              VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.email];

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

//PUT update a voter
router.put('/voter/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`
  const params = [req.body.email, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Voter not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

//DELETE a voter
router.delete('/voter/:id', (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Voter not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;