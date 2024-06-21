require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")

const Register=require('./routes/registerRoute');
const User=require('./routes/authRoute');
const form1=require('./routes/form1Route')

const app=express();
app.use(cors())

app.use(express.json())

app.use('/api/Register',Register)
app.use('/api/User',User)
app.use('/api/form1',form1)

mongoose.connect(process.env.MONGO_URI,{
    dbName:'learnbackend'
}).then(()=>{app.listen(process.env.PORT,()=>{
    console.log('database connected to port ',process.env.PORT)
})
}).catch((error)=>{
    console.log(error)
})




