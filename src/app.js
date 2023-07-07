const mongoose=require("mongoose")
const express=  require('express');

const router = require("./routers/users");
require('../src/db/conn');
require('dotenv').config();



const app=express();
var cors = require('cors');
app.use(cors());
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(router);



  

app.listen(port,()=>{
    console.log(`connection is a live  at port no. ${port}`)
})