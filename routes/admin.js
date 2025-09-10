const express = require('express');
const ADMIN = require('../models/admin')

const router = express.Router();

router.post('/signup', async(req,res)=>{
// console.log(req.body,"body");
const {name,email,password}=req.body;
const isExist = await ADMIN.findOne({email});
if(isExist){
    return res.status(400).json({success:false, message:"User with this email already exists"})
}
const admin = await ADMIN.create({
    userName:name,
    email:email,
    password:password,
})
// console.log(admin,"admin")
return res.json({success: true, message:"Account Created Successfully",admin});

});

router.post('/signin',async(req,res)=>{
    try {
        const {email, password} = req.body;
        // console.log(email,password)
        if(!email || !password){
            return res.status(404).json({success:false, message:"All fields are mandatory"})
        }
        const admin = await ADMIN.findOne({email})
        if(!admin){
            return res.status(404).json({ success: false, message:"No user found with this email"})
        }
        const {user,token} =await ADMIN.matchPasswordAndGenerateToken(password,admin);
         res.cookie('token', token);
        //  console.log(req.user)
        const userwithoutPass = req.user;

         return res.status(200).json({success: true, message:"Logged In ", user,token, userwithoutPass});
    } catch (error) {
        console.log("server error")
    }
})

router.post('/logout', async(req,res)=>{
    try {
        res.clearCookie('token')
    } catch (error) {
        
    }
})

module.exports = router;