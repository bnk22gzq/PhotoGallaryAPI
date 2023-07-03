const mongoose=require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/PhotoGallary",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("No connection");
    console.log(e);
})