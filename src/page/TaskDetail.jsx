import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../component/Header.jsx';

function TaskDetail() {
    
    const {id} = useParams();
    const location = useLocation();
    const tasks = location.state;
    console.log("data",tasks.task.title);
    console.log(id);
  return (
    <div>
        <Header props="Tasks Detail"/>
      <h2>Task Name : {tasks.task.title}</h2>
      <h2>Task Detail : {tasks.task.description}</h2>
      <form>
        
      </form>
    </div>
  )
}

export default TaskDetail
