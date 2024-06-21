const express =require('express')
const{
    registerController ,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getUsers,
} =require ('../controllers/authController.js');
const {isAdmin, requireSignIn }=require( '../middleware/authMiddleware.js');

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
//LOGIN || POST
router.post("/login", loginController);


//forgot password || POST
router.post("/forgot-password", forgotPasswordController);


//test routes
router.get("/test", requireSignIn, isAdmin, testController);


// protected route auth
router.get('/user-auth' , requireSignIn,(req,res) =>{
    res.status(200).send({ok:true});
})
//admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
//update profile
router.put("/profile", requireSignIn, updateProfileController);

router.get('/getUsers',getUsers)

module.exports=router;