const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id :mongoose.Types.ObjectId,
    name : String,
    email : {type : String},
    password :String,
    phone : String,
    role: {type:String , default:"user"}
    
}, {timeStamp:true})

const userModel =mongoose.model('user', userSchema)

exports.createUser = async (name, email,password,phone,role) => {
    try {
        const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password,
            phone,
            role

        });
        const result = await user.save()
        return result;
    } catch (error) {
        console.log(error)
    }
}

////// help to avoid duplication based on an email
exports.getUser = async(email) =>{
    try {
        const ret = await userModel.findOne({email})
        // console.log("model ", ret)
        return ret;
    } catch (error) {
        return null;
    }
    
}


/////// update user's information////////
exports.updateUser= async (userId, update) => {
    try {
       
        let resu= await userModel.updateOne({ _id :userId }, {$set:update});
        return resu;
      
    } catch (error) {
        console.log(error)

    }
}

////////delete user's information //////////////
exports.deleteUser= async (id) => {
    try {
        const res= await userModel.findByIdAndDelete(id);
        return res;  
    } catch (error) {
        console.log(error)

    }
}


/////////get all users ////////////
exports.getAllUsers = async () =>{
    try {
        const res = await userModel.find({})
        return res;
    } catch (error) {
        console.log(error);
        
    }
}