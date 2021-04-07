let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require('../models/survey');
let SurveyModel = Survey.model;

//connect the survey entry model
let SurveyEntry = require("../models/surveyEntry");
let SurveyEntryModel = SurveyEntry.model; // alias


module.exports.displayParticipatePage = (req, res, next) => {
    Survey.find((err, SurveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('survey/participate', {title: 'Participate', SurveyList: SurveyList, displayName: req.user ? req.user.displayName : ''});      
        }
        });
}

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find({ author: req.user.displayName},(err, SurveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', {title: 'Survey', SurveyList: SurveyList, displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey', displayName: req.user ? req.user.displayName : ''});         
};

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "topic": req.body.topic,
        "description": req.body.description,
        "author": req.user.displayName,
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
            res.render('survey/edit', {title: 'Edit survey', survey: SurveyToEdit, displayName: req.user ? req.user.displayName : ''})
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

//Renders survey-question view
module.exports.DisplaySurveyQuestionPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, SurveyList) => {
        if (err) {
            console.log(err);
            res.end(err);
        } 
        else {
            res.render('survey/answer', {title: 'Participate', SurveyList: SurveyList, displayName: req.user ? req.user.displayName : ''});     
                
         
        }
    });
};

//processes question page
module.exports.ProcessSurveyQuestionPage = (req, res, next) => {
      
    let id = req.params.id

    let newSurveyEntry = SurveyEntry({
        "_id": SurveyEntry._id,
        "SurveyID": id,
        "UserID": req.user.displayName,
        "a1": req.body.a1,
        "a2": req.body.a2,
        "a3": req.body.a3
    });

    SurveyEntry.create(newSurveyEntry, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/survey-list/participate');
        }
      });

    }


    //Render survey-result view
module.exports.DisplaySurveyResultPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, SurveyList) => {

        if (err) {
            console.log(err);
            res.end(err);
        } else {

    SurveyEntry.findOne({SurveyID: id}, (err, SurveyEntry) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                } else {

                    res.render("survey/result", {
                        title: "Survey Result",
                        SurveyList: SurveyList,
                        SurveyEntry: SurveyEntry,
                        displayName: req.user ? req.user.displayName : "",
                        total: SurveyEntry.SurveyID.length
                    });
                }
           
            
            });

        }
        
    });
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