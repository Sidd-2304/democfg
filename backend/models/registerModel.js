const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    fatherName:{
        type:String,

    },
    motherName:{
        type:String
    },
    contact:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:String
    },
    password:{
        type:String
    }
}, { timestamps: true });

const RegisterSchema=mongoose.model('RegisterSchema',Schema);

module.exports=RegisterSchema;