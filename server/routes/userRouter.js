const express = require('express');
const usercontroller = require('../controllers/userController')
const userRoute = express.Router();


userRoute.post('/login', usercontroller.signin)
 

userRoute.post('/create',usercontroller.validateToken, usercontroller.createUser);
userRoute.get('/:email', usercontroller.validateToken, usercontroller.getUser)
userRoute.put('/:id',  usercontroller.validateToken,usercontroller.updateUser)
userRoute.delete('/:id/',usercontroller.validateToken, usercontroller.deleteUser);

userRoute.get('/',  usercontroller.getAllUsers);

module.exports = userRoute;          