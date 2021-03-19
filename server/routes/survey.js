let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our survey Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey');



/* GET Route for the survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.DisplayEditPage);

/* 
* add your code to 
* POST Route for processing the Edit page - UPDATE Operation 
*/
router.post('/edit/:id', surveyController.ProcessEditPage);
/* add your code to 
*  GET to perform  Deletion - DELETE Operation 
*/
router.get('/delete/:id', surveyController.PerformDelete);
module.exports = router;