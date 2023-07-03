const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
         trim:true,
        unique:true
    },
    rfid:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    folder_path:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
})
const UserPhotoes=new mongoose.model('UserPhotoes',userSchema);

module.exports=UserPhotoes;