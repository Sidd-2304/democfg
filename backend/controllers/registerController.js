const RegistrationForm=require('../models/registerModel')
const jwt=require('jsonwebtoken')

const edit=async(req,res)=>{
    console.log(req.body)
    try{
        const exhistingUser =await RegistrationForm.findOne({
            email:req.body.email

        })
        console.log(exhistingUser)
        if (exhistingUser){
            return res.status(400).json({msg:"user already exhisted"})

        }
        const newUser= new RegistrationForm(req.body)
        await newUser.save()
        return res.status(200).json({msg:'user created successfully',newUser:newUser})


    }catch(error){

    }
}



module.exports={edit}