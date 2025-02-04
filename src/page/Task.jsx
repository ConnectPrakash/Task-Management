import React, { useEffect, useState } from "react";
import Header from "../component/header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [company, setCompany] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const token = localStorage.getItem("token") || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [companyRes, taskRes] = await Promise.all([
          axios.get("https://task-management-dr4x.onrender.com/user"),
          axios.get("https://task-management-dr4x.onrender.com/task"),
        ]);

        setCompany(companyRes.data.data || []);
        setTasks(taskRes.data.data || []);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Corrected filtering logic
  useEffect(() => {
    if (isDataLoaded && userId) {
      const filtered = tasks.filter(
        (task) => task.createdId === userId && task.assignedUserId !== userId
      );
      setFilteredTasks(filtered);
    }
  }, [tasks, userId, isDataLoaded]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://task-management-dr4x.onrender.com/task/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div>
      <Header props={"Task"} />
      <div className="Task height">
        {token && (
          <div>
            <button onClick={() => navigate("/createTask")}>
              <Plus /> Create Task
            </button>
          </div>
        )}

{token ? <ul>
          {filteredTasks.map((task) => {
            const assignedUser = company.find((user) => user._id === task.assignedUserId);

            return (
              <li key={task._id}>
                <Trash2 className="dlt" onClick={() => handleDelete(task._id)} />
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
                  <p>Assigned to: {assignedUser ? assignedUser.name : "Unknown"} </p>
                  <Link to={`/taskdetail/${task._id}`} state={{ task }}>
                    View Details
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>:<h2 className="login1">You Should Login First!</h2>}
      </div>
    </div>
  );
}

export default Task;
