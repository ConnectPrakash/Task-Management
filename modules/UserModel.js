const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "role":{
        type:String,
        enum:["admin","employee"],
        required:true
    },
    "isSuperAdmin":{
        type:Boolean,
        required:true
    },
    // "companyId":{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Company",
    // },
    "companyName":{
        type:String
    },
    "companyAddress":{
        type:String
    },
    "companyWebsite":{
        type:String
    },
    "securityKey":{
        type:String
    },
    "User":[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    "tasks":[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }]
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);