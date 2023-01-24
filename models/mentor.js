// const mongoose = require('mongoose');
import mongoose from 'mongoose';


    const newMentor = new mongoose.Schema({
        name: {
            type : String,
            required : true
        },
        email: {
            type : String,
            required : true 
        },
        expertise: {
            type : String,
            required : true
        }

    },
    {timestamps : true}
    )
    // newMentor.save((err) => {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log('Mentor Data successfully saved!');
    //         }
    //       });



// module.exports = mongoose.model('mentor', newMentor);

export default mongoose.model('mentor', newMentor);