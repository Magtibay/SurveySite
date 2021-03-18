let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', {title: 'Survey', surveyList: surveyList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
       
        "description": req.body.description,
        "question": req.body.question
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

}
/*
Add your code here to display EDIT
*/

module.exports.DisplayEditPage = (req,res,next) =>{
    let id = req.params.id;

    Survey.findById(id,(err, surveyToEdit) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit survey', survey: surveyToEdit})
        }
    });
}

/*
Add your code here to process EDIT
*/

module.exports.ProcessEditPage =(req,res,next) =>{
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,  
        "description": req.body.description,
        "question": req.body.question

      
    });

    survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
                   //refresh survey list
            res.redirect('/survey-list');
        }

    })
}


/*
Add your code here to perform DELETE operation
*/

module.exports.PerformDelete = (req,res,next) =>{
    let id = req.params.id;

    Survey.remove({_id:id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
                   //refresh survey list
            res.redirect('/survey-list');
        }

    });
}