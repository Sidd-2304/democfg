const userModel=require( "../models/userModel.js");
const{comparePassword, hashPassword } =require( '../helper/authHelper.js');
const JWT =require("jsonwebtoken");
const registerController = async (req,res)=>{
    try {
        const {name,email,password,phone,address,answer} = req.body;
        // validation
        if(!name){
            return res.send({message :"name is required"});
        }
        if(!email){
            return res.send({message :"email is required"});
        }
        if(!password){
            return res.send({message :"password is required"});
        }
        if(!phone){
            return res.send({message :"phone is required"});
        }
        if(!address){
            return res.send({message :"address is required"});
        }
        if(!answer){
            return res.send({message :"answer is required"});
        }
        //check user
        const exsitingUser= await userModel.findOne({email});
        // existing user
        if(exsitingUser){
            return res.status(200).send({
                success: false,
                message:"account already exists please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();
        res.status(201).send({
            success:true,
            message:"registered successfully",
            user,

        });
    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message : "Error in Registeration",
            error,
        });
    }
};

//POST LOGIN
 const loginController = async(req,res) => {
  try{
    const {email,password} = req.body
    //validation
    if(!email || !password){
       return res.status(404).send({
            success:false,
            message:"invalid email or password",
       });
   }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
           success:false,
           message:"email is not registered",
       });
    }
    const match = await comparePassword(password,user.password);
    if(!match){
      res.status(200).send({
            success:false,
            message:"invalid password",
        });
    }
    //token
   const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7d",
   });
    res.status(200).send({
        success:true,
        message:"login successfully",
        user :{
         name : user.name,
            email:user.email,
            phone:user.phone,
            address :user.address,
            role:user.role,
        },
        token,
   });
 }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
        message:"error in login",
        error,
    })
  }
};
//forgotPasswordController
 const forgotPasswordController =async (req,res) => {
    try {
        const {email,answer,newPassword}=req.body
        console.log(email,answer,newPassword)
        if(!email){
            res.status(400).send({message:"Email is required"})
            
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"newPassword is required"})
        }
        //check 
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
           return res.status(404).send({
            success:false,
            message:"wrong email or answer"
           })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password: hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
   console.log(error)
   res.status(500).send({
    success:false,
    message:"something went wrong",
    error
   })     
    }
}

//test controller
const testController = (req,res) =>{
    try{
        res.send("protected routes");
    }catch(error){
        console.log(error);
        res.send({error});
    }
};

//update profile
const updateProfileController = async (req,res) =>{
    try {
        const {name,email,password,address,phone} = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length<8){
            return res.json({error:'password is required and 8 char long'})
        }
        const hashedPassword = password? await hashPassword(password) :undefined
        const updatedUser =  await userModel.findByIdAndUpdate(req.user._id,{name:name || user.name , password :hashedPassword|| user.password, phone:phone || user.phone , address:address || user.address },{new:true})
        res.status(200).send({
            success:true,
            message:"updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error while updatting profilr',
            error
        })
    }
};


const getUsers=async(req,res)=>{
    try{
        const allUsers=await userModel.find({})
        console.log(allUsers)
        return res.status(200).json({allUsers:allUsers})
    }catch(error){
        return res.status(400).json({msg:error})
    }
}

module.exports={registerController,
    updateProfileController,
    testController,
    forgotPasswordController,
    loginController ,
    getUsers
}




