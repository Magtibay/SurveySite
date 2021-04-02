let mongoose = require('mongoose');

// create a model class for the survey

let surveyModel = mongoose.Schema ({

    topic: String,
    description: String,
    author: String,
    q1: String,
    q2: String,
    q3: String
    
},
{
    collection : "surveys"
});


module.exports = mongoose.model('Survey', surveyModel);