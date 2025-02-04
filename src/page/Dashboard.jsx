import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import axios from 'axios';
import { FilePenLine } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  let token
  useEffect(() => {
  token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id); // Store userId from token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, taskRes] = await Promise.all([
          axios.get("https://task-management-dr4x.onrender.com/user"),
          axios.get("https://task-management-dr4x.onrender.com/task")
        ]);
        
        setUsers(userRes.data.data || []);
        setTasks(taskRes.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // ✅ Filter tasks where createdId is NOT the logged-in userId
  const userTasks = tasks.filter(task => task.createdId !== userId);

  return (
    <div>
      <Header props={"Dashboard"} />
      <div className='Task height'>
        {userTasks.length > 0 && token? (
          <ul>
            {userTasks.map((task) => {
              const createdUser = users.find(user => user._id === task.createdId);
              return (
                <li key={task._id}>
                  <FilePenLine className='edit' onClick={() => navigate(`/editTask/${task._id}`)} />
                  <ToastContainer />
                  <div className="task-box">
                    <h2>Title: {task.title}</h2>
                    <p>Description: {task.description}</p>
                    <p>
                      Status:{" "}
                      <span className={task.status === "Process" ? "yellow" : task.status === "Completed" ? "green" :"red"}>
                      {task.status}
                      </span>
                    </p>
                    <p>Created by: {createdUser ? createdUser.name : "Unknown"}</p>
                    <Link to={`/taskdetail/${task._id}`} state={{ task }}>
                      View Details
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : !token ?(<h2 className='login1'>You Should Login First!</h2>):(
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
