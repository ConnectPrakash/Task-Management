import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "../component/header";

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assign, setAssign] = useState("");
  const [tasks, setTasks] = useState([]);

  let filterUser =[]

  const [companyId, setCompanyId] = useState(null);

  const token = localStorage.getItem("token");
  let decoded = null;

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    axios
      .get("https://task-management-dr4x.onrender.com/user")
      .then((response) => {
        const users = response.data.data || [];
        setTasks(users);
        
        // Find the company ID of the logged-in user
        const loggedInUser = users.find((user) => user._id === decoded?.id);
        setCompanyId(loggedInUser?.companyId || null);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [decoded?.id]); // Depend on `decoded?.id` to refetch when the token changes

 
  
  let user = tasks.find((user)=>user._id===decoded.id);


  const handleTask = () => {
    if (!title || !description || !assign) {
      alert("Please fill all fields before submitting!");
      return;
    }

    axios
      .post("https://task-management-dr4x.onrender.com/task", {
        title,
        description,
        status: "Pending",
        createdId: decoded?.id,
        assignedUserId: assign,
        companyId, // Directly use `companyId` from state
      })
      .then(() => {
        alert("Task Created Successfully!");
        setTitle('');
        setDescription('');
        setAssign('');
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  return (
    <div className="New-Task">
      <Header props="Add Task"/>
      <div className="new-task">
      <h2>New Task Creation</h2>
      <div className="Task-container">
        <div className="Task-input">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="Task-input">
          <label htmlFor="description">Task Desc:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="Task-input">
          <label>Assigned User By:</label>
          <select
            name="assignedUserId"
            value={assign}
            onChange={(e) => setAssign(e.target.value)}
          >
            <option value="">Select Assignee</option>
            {tasks.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="Task-input">
          <button onClick={handleTask}>Add Task</button>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default NewTask;
