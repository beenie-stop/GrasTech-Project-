import mongoose, { mongo } from "mongoose";
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,        
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})//two feild object and timestamps

const User=mongoose.model('user',userSchema)
export default User;