const mongoose = require('mongoose');

const TaskSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Process","Completed"],
        default:"Pending"
    },
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    }
},{timestamps:true});

module.exports =mongoose.model("Task",TaskSchema)