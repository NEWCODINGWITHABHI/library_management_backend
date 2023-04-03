const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
       
    },
    phonenumber:{
        type:String,
    },
    email:{
        type:String,
       
    },
    password:{
        type:String,
       
    }

})

module.exports=new mongoose.model("users",userSchema);