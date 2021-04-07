


//surveyEntry variables
let mongoose = require('mongoose');


//Model Structure
let SurveyEntryModel = mongoose.Schema ({
    SurveyID: String,
    UserID: String,
    a1: String,
    a2: String,
    a3: String
},
{
    collection: "surveyEntry"
});

//Processes Model
module.exports = mongoose.model('SurveyEntry', SurveyEntryModel);