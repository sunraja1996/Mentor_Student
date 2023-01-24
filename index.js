import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
import mentor from "./models/mentor.js";
import student from "./models/student.js";


// const mongoose = require('mongoose');
// const express = require('express');

// const dotenv = require("dotenv")
// const mentor = require('./models/mentor');
// const student = require('./models/student');


const router = express.Router();

dotenv.config();

const connectToDb = () => {
   
    mongoose.connect(process.env.MONGO_URL, 
        { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log("Error connecting to MongoDB: ", err);
        });
};
mongoose.set('strictQuery', true);

connectToDb();


// Home page
router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome Mentor Student Creation App',
      To_create_a_mentor: '/mentors',
      To_create_a_student: '/students',
      To_assign_Students_to_Mentor: ' /mentors/:mentorId/assign-students',
      To_show_students_assigned_a_Mentor: '/mentors/:mentorId/students',
    });
  });




router.post('/mentors', (req, res) => {
    const newMentor = new mentor({
        name: req.body.name,
        email: req.body.email,
        expertise: req.body.expertise
    });

    newMentor.save()
        .then(mentor => {
            res.json(mentor);
        })
        .catch(err => {
            res.status(400).json({
                message: "Failed to create mentor",
                error: err
            });
        });
});




router.post('/students', (req, res) => {
    const newStudent = new student({
        name: req.body.name,
        email: req.body.email,
        level: req.body.level
    });

    newStudent.save()
        .then(student => {
            res.json(student);
        })
        .catch(err => {
            res.status(400).json({
                message: "Failed to create student",
                error: err
            });
        });
});






router.put('/mentors/:mentorId/assign-students', (req, res) => {
    mentor.findById(req.params.mentorId)
        .then(mentor => {
            if (!mentor) {
                return res.status(404).json({
                    message: "Mentor not found"
                });
            }

            const studentsToAssign = req.body.studentIds;

            student.updateMany({ _id: { $in: studentsToAssign } }, { $set: { mentor: mentor._id } })
                .then(result => {
                    res.json({
                        message: "Students have been assigned to the mentor"
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message: "Failed to assign students to mentor",
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(400).json({
                message: "Failed to find mentor",
                error: err
            });
        });
});

router.get('/mentors/:mentorId/students', (req, res) => {
    mentor.findById(req.params.mentorId)
    .then(mentor => {
        if (!mentor) {
            return res.status(404).json({
                message: "Mentor not found"
            });
        }
        student.find({mentor: mentor._id})
            .then(students => {
                if (!students) {
                    return res.status(404).json({
                        message: "No students found for this mentor"
                    });
                }
                res.json(students);
            })
            .catch(err => {
                res.status(400).json({
                    message: "Failed to retrieve students",
                    error: err
                });
            });
    })
    .catch(err => {
        res.status(400).json({
            message: "Failed to find mentor",
            error: err
        });
    });
});

// module.exports = router;


export default router;
