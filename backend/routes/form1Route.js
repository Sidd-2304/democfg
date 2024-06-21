const express=require('express')
const router=express.Router()

const {editform}=require('../controllers/form1Controller');

router.post("/",editform);

module.exports=router;