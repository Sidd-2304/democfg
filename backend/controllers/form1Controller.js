const form1 =require('../models/form1Model')
const jwt=require('jsonwebtoken')

const editform=async(req,res)=>{
    console.log(req.body)
    try{
        const exhist=await form1.findOne({
            email:req.body.email
        })
        console.log(exhist)
        if (exhist){
            return res.status(400).json({msg:'already exhist'})
        }
        const newUser1= new RegistrationForm(req.body)
        await newUser1.save()
        return res.status(200).json({msg:'user created successfully',newUser:newUser})


    }catch(error){

    }
 }

 module.exports={editform}
