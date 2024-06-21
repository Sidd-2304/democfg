const express=require('express')
const router=express.Router()

const {edit}=require('../controllers/registerController');

router.post("/",edit);

module.exports=router;