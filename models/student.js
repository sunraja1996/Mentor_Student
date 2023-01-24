
// const mongoose = require('mongoose');
import mongoose from 'mongoose';




    const newStudent = new mongoose.Schema({
        name: {
            type : String,
            required : true
        },
        email: {
            type : String,
            required : true 
        },
        level: {
            type : String,
            required : true
        }
    })
   

    // newStudent.save((err) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log('Student Data saved successfully');
    //     }
    //   });
    


// module.exports = mongoose.model('student', newStudent);

export default mongoose.model('student', newStudent);
