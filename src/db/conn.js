require('dotenv').config();
const mongoose=require('mongoose');
const mongostring=process.env.MONGODB_URI;

//const url=mongodb://0.0.0.0:27017/PhotoGallary  //for the mongodb compass         //postman= localhost:3000/users
mongoose.connect(mongostring,{
  
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("No connection");
    console.log(e);
})