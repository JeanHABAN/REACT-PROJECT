const mongoose = require('mongoose');
const schoolSchema = new mongoose.Schema(

        {
            sname: String,
            email: String,
            phone :String,
            courses: [{type: mongoose.Schema.Types.ObjectId, ref:"courses"}]

        }
    

)

const studentModel = mongoose.model('student', schoolSchema);

module.exports = studentModel