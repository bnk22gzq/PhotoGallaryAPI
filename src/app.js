const mongoose=require("mongoose")
const express=  require('express');
require('../src/db/conn');
require('dotenv').config();
const router = require("./routers/users");


const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(router);


app.listen(port,()=>{
    console.log(`connection is a live  at port no. ${port}`)
})