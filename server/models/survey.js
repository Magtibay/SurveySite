let mongoose = require('mongoose');

// create a model class for the survey

let surveyModel = mongoose.Schema ({

    name: String,
    description: String,
    question: String
    
},
{
    collection : "surveys"
});


module.exports = mongoose.model('Survey', surveyModel);