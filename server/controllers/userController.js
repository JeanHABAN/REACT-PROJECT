const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'CS568'


/////////create user ///////////
exports.createUser = async (req, res, next) => {
    const { name, email, password, phone, role } = req.body;
    const encryptPsw = bcrypt.hashSync(password, 8);

    try {
        const found = await userModel.getUser(email);
        if (found) {
            return res.status(400).send('this email is already registered');
        }
        await userModel.createUser(name, email, encryptPsw, phone, role)


        res.send({ success: true, add: 'registered' })
    } catch (error) {
        res.status(500).send('error')
    }
}

///////// login /////////
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const item = await userModel.getUser(email);
    // console.log(item)
    if (!item) {
        return res.send('invalid email')
    }
    if (!bcrypt.compare(password, item.password)) {
        return res.send('invalid password');
    }
    const token = jwt.sign(
        {
            email,
            role: item.role
        }
        , PRIVATE_KEY);
    res.send(token);
}

//////// valdation token ////////

exports.validateToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).send({ err: 'unauthorized' })
    }
    const arr = header.split(" ");
    if (arr.length !== 2) {
        return res.status(500).send("bearer schema is not valid");
    }
    const token = arr[1];
    try {
        const user = jwt.verify(token, PRIVATE_KEY)
        if (user.role === 'admin') {
            next();
        }else{
            res.status(403).send('not allowed')
        }
    } catch (err) {
        return res.status(403).send({ err: 'Forbidden' })
    }
};

/////////update a user ///////////////
exports.updateUser = async (req, res)=>{
 try {
    const{id} = req.params
    const newData = req.body

    const result = await userModel.updateUser(id, newData)
    return res.status(200).send({success:true,data:result})
 } catch (error) {
    return res.status(401).send('not updated')
 }
}

///////////get all users ////////////
exports.getAllUsers = async (req, res) => {
      try {
        const result = await userModel.getAllUsers();
        res.status(200).send({success:true, data :result})
      } catch (error) {
        return res.status(404).send({success:false, message:"not found"})
      }
    
}
 

//////////// get a user by email ////////////////////

exports.getUser = async(req,res)=>{
    try {
        let result = await userModel.getUser(req.params.email);
        return res.status(200).send({success:true, data : result})
    } catch (error) {
        return res.status(404).send({success:false, message:"not found"})
        
    }
}
////////////delete a user ////////////////////////////
exports.deleteUser = async (req, res) => {
     const {id} = req.params
    try {
        await userModel.deleteUser(id);
        res.status(200).send({success:true, message:"user is deleted successful"});
    } catch (error) {
        res.status(404).send({success:false, message:" user is not found"})
        
    }
   
}


