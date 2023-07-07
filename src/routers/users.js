const express=require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router=new express.Router();
const UserModel=require("../models/usermodel");
require('dotenv').config();


  
//signup user
router.post('/signup',async(req,res)=>{
    bcrypt.hash(req.body.password,1,async (err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            try{
                    const addingNewUser=new UserModel({
                    username:req.body.username,
                    email:req.body.email,
                    password:hash,
                    rfid:req.body.rfid,
                    folder_path:req.body.folder_path
                    });
                    const insertUser=await addingNewUser.save();
                    res.status(201).send(insertUser);

            }
            catch(e)
            {
                res.status(400).send(e);
            }
           

        }
    })
})

//login user
router.post('/login', (req, res) => {
    const { email,password } = req.body;
  
    UserModel.findOne({ email })
      .then(async(user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        bcrypt.compare(password,user.password)
          .then((bcryptResult) => {
            if (!bcryptResult) {
              return res.status(401).json({ message: 'Invalid password' });
            }
  
            const token = jwt.sign({ userId: user._id,username:user.username,password:user.password,email:user.email,rfid:user.rfid}, process.env.SECRET_KEY,{expiresIn:"24h"});
            res.json({
                username:user.username,
                email:user.email,
                password:user.password,
                rfid:user.rfid,
                token:token
            });
          })
          .catch((bcryptErr) => {
            console.error(bcryptErr);
            res.status(500).json({ message: 'Internal Server Error' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });




//get message
router.get('/',async(req,res)=>{
    try{
        res.status(201).send("welcome to the Photo gallary rest api");
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})
// get all use data

router.get('/users',async(req,res)=>{
    try{
        
        const getUsers=await UserModel.find({});
        res.status(201).send(getUsers);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})
//get specific user
router.get('/users/:rfid',async(req,res)=>{
    try{
        const _rfid=req.params.rfid;
        const getUser=await UserModel.findOne({rfid:_rfid});
        res.status(201).send(getUser);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})
//updata specific user data
router.patch('/users/:rfid',async(req,res)=>{
    try{
        const _rfid=req.params.rfid;
        const updateUser=await UserModel.findOneAndUpdate({rfid:_rfid},req.body,{new:true});
        res.status(201).send(updateUser);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

}) 
//delete specific user
// router.delete('/users/:rfid',async(req,res)=>{
//     try{
//         const _rfid=req.params.rfid;
//         const removeUser=await UserModel.findOneAndRemove({rfid:_rfid});
//         res.status(201).send(removeUser);
//     }
//     catch(e)
//     {
//         res.status(400).send({message:e.message});
//     }

// })

//delete all user

// router.delete('/users',async(req,res)=>{
//     try{
        
//         const getUsers=await UserModel.deleteMany({});
//         res.status(201).send(getUsers);
//     }
//     catch(e)
//     {
//         res.status(400).send(e);
//     }

// })
module.exports=router;