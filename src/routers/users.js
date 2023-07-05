const express=require("express");
const router=new express.Router();
const UseModel=require("../models/usermodel");

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

//create user
router.post('/users',async(req,res)=>{
    try{
        const addingNewUser=new UseModel({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
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

})

// get all use data

router.get('/users',async(req,res)=>{
    try{
        
        const getUsers=await UseModel.find({});
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
        const getUser=await UseModel.findOne({rfid:_rfid});
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
        const updateUser=await UseModel.findOneAndUpdate({rfid:_rfid},req.body,{new:true});
        res.status(201).send(updateUser);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

}) 
//delete specific user
router.delete('/users/:rfid',async(req,res)=>{
    try{
        const _rfid=req.params.rfid;
        const removeUser=await UseModel.findOneAndRemove({rfid:_rfid});
        res.status(201).send(removeUser);
    }
    catch(e)
    {
        res.status(400).send({message:e.message});
    }

})

//delete all user

router.delete('/users',async(req,res)=>{
    try{
        
        const getUsers=await UseModel.deleteMany({});
        res.status(201).send(getUsers);
    }
    catch(e)
    {
        res.status(400).send(e);
    }

})
module.exports=router;