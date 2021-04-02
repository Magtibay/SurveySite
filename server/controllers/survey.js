let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, SurveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', {title: 'Survey', SurveyList: SurveyList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "topic": req.body.topic,
       
        "description": req.body.description,
        "author": req.body.author,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3
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

    Survey.findById(id,(err, SurveyToEdit) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit survey', survey: SurveyToEdit})
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
        "topic": req.body.topic,
        "description": req.body.description,
        "author": req.body.author,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3

      
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
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