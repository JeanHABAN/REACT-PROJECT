const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({ 
        tname: String,
        email: String,
        phone : String,
        photo : String,
        about : String,
        course: [{type: mongoose.Schema.Types.ObjectId, ref:"courses"}]
})

const trainerModel = mongoose.model('trainer', schoolSchema);
module.exports = trainerModel