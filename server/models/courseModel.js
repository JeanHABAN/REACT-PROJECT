const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
    {
      
        title: String,
        capacity: Number,
        available: Number,
        descrip : String,
        students: [ {type: mongoose.Schema.Types.ObjectId, ref:"students"}   ],

    }

)
const courseModel = mongoose.model('course', schoolSchema);

module.exports = courseModel

