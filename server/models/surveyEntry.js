


//surveyEntry variables
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model;

//Model Structure
let SurveyEntry = new Schema({
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
module.exports.Model = Model('SurveyEntry', SurveyEntry);