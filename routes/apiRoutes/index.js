//Modularize the routes
//index.js will act as a central hub to pull them all together
const express = require('express');

//Function used to create a new router object
const router = express.Router();

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));


module.exports = router;