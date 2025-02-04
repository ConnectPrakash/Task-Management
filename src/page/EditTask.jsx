import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function EditTask() {
    const [task,setTask] = useState([]);
    const [user,setUser] = useState([]);
    const [status,setStatus] = useState([]);
    const {id} = useParams();
    useEffect(() =>{
        axios.get(`https://task-management-1-al5b.onrender.com/task/${id}`)
        .then((response) =>{
           setTask(response.data.data);
        })
        .catch((error) =>{
            console.log("Error",error.message)
        })
    },[])
  console.log(task.createdId);
    useEffect(() =>{
        axios.get(`https://task-management-1-al5b.onrender.com/user/${task.createdId}`)
        .then((response) =>{
           setUser(response.data.data);
        })
        .catch((error) =>{
            console.log("Error",error.message)
        })
    },[])
    console.log(task.createdId);

  const handleUpdate = () =>{
    axios.put(`https://task-management-1-al5b.onrender.com/task/${task._id}`,{
         title:task.title,
         description:task.description,
        status
    })
    
  }
        
    console.log(user);
  return (
    <div>
        <Header props="Edit Task"/>
      <form className='Edit-controller'>
        <div className='Edit-container'>
            <label>Title : </label>
            <h3>{task.title}</h3>
         </div>
         <div className='Edit-container'>
            <label>Description : </label>
           <h3>{task.description}</h3>
         </div>
         <div className='Edit-container'>
            <label>Created By: </label>
            <h3>{user.name}</h3>
         </div>
         <div className='Edit-container'>
            <label>Process : </label>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="Pending">To-Do</option>
                <option value="Process">Process</option>
                <option value="Completed">Completed</option>
            </select>
         </div>
         <div className='Edit-container-button'>
            <button onClick={handleUpdate}>Update</button>
         </div>
      </form>
    </div>
  )
}

export default EditTask
