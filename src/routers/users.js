const express=require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router=new express.Router();
const UserModel=require("../models/usermodel");
const verifyToken=require("../../auth");
require('dotenv').config();


  
//....................................public....................................

//signup user
router.post('/signup',async(req,res,next)=>{
    const {email}=req.body.email;
    try {
        const user = await UserModel.findOne({email:email});
        if(user) return res.status(500).json({ message: 'This user already exist' });
        const addingNewUser=new UserModel
        ({
                            username:req.body.username,
                            email:req.body.email,
                            password:req.body.password,
                            rfid:req.body.rfid,
                            photoes:req.body.photoes
        });
        const insertUser=await addingNewUser.save();
        res.status(201).send(insertUser);
       
     } catch (error) {
         next(error)
     }
})

//login user
router.post('/login', (req, res,next) => {
    const { email,password } = req.body;
    try {
                if(!email || !password) return next(ApiError.NotFound("please input values"))
                UserModel.findOne({ email })
                .then(async(user) => {
                    if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                    }
                    const isMatch = await user.matchPassword(password);
                    if(!isMatch) return res.status(400).json({message:"wrong password"})
            
                    const token = jwt.sign({username:user.username,email:user.email,rfid:user.rfid}, process.env.SECRET_KEY);
                     res.json({
                            username:user.username,
                            email:user.email,
                            password:user.password,
                            rfid:user.rfid,
                            token:token
                    });
                    
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Erro,user' });
                });
    }catch(error){
        next(error);
    }
  });

//get message
router.get('/',async(req,res,next)=>{
    try{
        res.status(201).send("welcome to the Photo gallary rest api");
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})

//get photoes only on rfid card
router.get('/users/:rfid',async(req,res,next)=>{
    try{
        const _rfid=req.params.rfid;
        const getUser=await UserModel.findOne({rfid:_rfid});
        res.status(201).send(getUser.photoes);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})

//..........................................private.....................................................
//post photoes using patch request..............
router.patch('/users/:rfid',verifyToken,async(req,res,next)=>{
    try
    {
        const _rfid=req.params.rfid;
        const updateUser=await UserModel.findOneAndUpdate({rfid:_rfid},req.body,{new:true});
        res.status(201).send(updateUser);
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})





//get specific user
// router.get('/users/:rfid',async(req,res)=>{
//     try{
//         const _rfid=req.params.rfid;
//         const getUser=await UserModel.findOne({rfid:_rfid});
//         res.status(201).send(getUser);
//     }
//     catch(e)
//     {
//         res.status(400).send(e);
//     }

// })


module.exports=router;