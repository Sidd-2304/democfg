const JWT =require ('jsonwebtoken');
const userModel =require ("../models/userModel.js");

//protected routes token base
const requireSignIn = async (req,res,next) =>{
    try{
        const decode= JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user =decode;
        next();
}catch(error){
        console.log(error);
    }
};
//admin access
 const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access: User not found",
            });
        }
        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access: User is not an admin",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};



module.exports={
    requireSignIn,
    isAdmin
}