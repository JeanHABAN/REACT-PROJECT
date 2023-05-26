
 const express = require('express');
 const cors = require('cors')

const mongoose = require('mongoose');
const routeSchool = require('./routes/routeSchool')
const useRouter = require('./routes/userRouter')
const courseRoute = require('./routes/courseRoute')
const trainerRoute = require('./routes/trainerRoute')
const studentRoute = require('./routes/studentRoute')
const app = express();
app.use(express.json());
app.use(cors())
const uri = "mongodb://127.0.0.1:27017/Backend-React"
mongoose.connect(uri)

async function main(){
    return mongoose.connect(uri);
}


function run(){
    main().then(()=> console.log('DB connected')).catch(err => console.log(err));
}
run();

app.use('/', routeSchool )
app.use ('/user', useRouter)
app.use('/course', courseRoute)
app.use('/trainer', trainerRoute)
app.use('/student', studentRoute)
//handler

app.use((error,req,res,next)=>{
    if(error && error.message){
       return res.status(500).send({success: false, message: error.message})
    }else{
       return res.status(500).send('Api is not supported')
    }
})

app.use((req,res,next)=>{
    res.status(501).send('wrong API')
})

app.listen(5000, ()=>console.log('listening on port 5000'))
