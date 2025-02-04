const TaskModel = require("../modules/TaskModel");
const mongoose = require('mongoose');
module.exports.TaskController = async (req, res) => {
  try {
    const {title, description, status, createdId, assignedUserId, companyId } =
      req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      status,
      createdId:new mongoose.Types.ObjectId(createdId),
      assignedUserId:new mongoose.Types.ObjectId(assignedUserId),
      companyId:new mongoose.Types.ObjectId(companyId)
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Task",
      error: error.message,
    });
  }
};
module.exports.EditTaskController = async(req,res) =>{
  try {
    const {id} = req.params;
    const {title,description,status} = req.body;
    const EditTask = await TaskModel.findByIdAndUpdate(id,{
      title,
      description,
      status
    })

    res.status(201).json({
      success:true,
      message:"Task Edited Successfully",
      data:EditTask
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error Edit Task"
    })
  }
}
module.exports.DeleteTaskController = async(req,res) =>{
  try {
    const {id} = req.params;
    const deleteTask = await TaskModel.findByIdAndDelete(id);

    res.status(201).json({
      success:true,
      message:"Task Deleted Successfully",
      data:deleteTask
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error Task Delete",
      error:error.message
    })
  }
}
module.exports.AllTaskController = async(req,res) =>{
  try {
      const allTask = await TaskModel.find({});

      res.status(201).json({
        success:true,
        message:"All Task List",
        data:allTask
      })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error fetching Task",
      error:error.message
    })
  }
}
module.exports.OneTaskController = async(req,res) =>{
  try {
    const {id} = req.params;

    const OneTask = await TaskModel.findById(id);

    res.status(201).json({
      success:true,
      message:"fetch One Task data",
      data:OneTask
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error fetching One Task",
      error:error.message
    })
  }
}