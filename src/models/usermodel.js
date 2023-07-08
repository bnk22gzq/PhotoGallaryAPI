const bcrypt=require("bcrypt");
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
   photoes:
   {
        type:Array,
   }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(1);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
};

const UserPhotoes=new mongoose.model('UserPhotoes',userSchema);

module.exports=UserPhotoes;



//api key: SNaRZnTsq9AZE2DdW74t64JBEI0ySHxxoampouCBfNd80dWUh9RfXHbEKNWcc0wt