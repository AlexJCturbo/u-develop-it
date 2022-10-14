const express = require('express');

//PORT designation and the app expression
const PORT = process.env.PORT || 3005;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());