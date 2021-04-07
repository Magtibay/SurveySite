let express = require('express');
let router = express.Router();


// connect to our survey Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the survey List page - READ Operation */
router.get('/', requireAuth, surveyController.displaySurveyList);

/* GET Route for the survey List page - READ Operation */
router.get('/participate', requireAuth, surveyController.displayParticipatePage);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, surveyController.DisplayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, surveyController.ProcessEditPage);

/* POST Route for displaying the Answer Survey Page */
router.post('/answer/:id', requireAuth, surveyController.DisplaySurveyQuestionPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, surveyController.PerformDelete);
module.exports = router;