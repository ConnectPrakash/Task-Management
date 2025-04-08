import { useEffect, useState } from "react";
import Header from "../component/header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../component/loader";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [company, setCompany] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
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
          axios.get("https://task-management-1-al5b.onrender.com/user"),
          axios.get("https://task-management-1-al5b.onrender.com/task"),
        ]);

        setCompany(companyRes.data.data || []);
        const userTasks = taskRes.data.data?.filter(
          (task) => task.createdId === userId && task.assignedUserId !== userId
        ) || [];
        setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`https://task-management-1-al5b.onrender.com/task/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
      toast.error("Failed to delete task");
    }
  };

  const renderTasks = () => {
    if (loading) return <Loader/>;
    if (tasks.length === 0) return <p>No tasks available.</p>;

    return (
      <ul>
        {tasks.map((task) => {
          const assignedUser = company.find((user) => user._id === task.assignedUserId);
          return (
            <li key={task._id} className="task-item">
              <Trash2 className="dlt" onClick={() => handleDelete(task._id)} />
              <ToastContainer />
              <div className="task-box">
                <h2>Title: {task.title}</h2>
                <p>Description: {task.description}</p>
                <p>
                  Status:{" "}
                  <span className={task.status === "Process" ? "yellow" : task.status === "Completed" ? "green" : "red"}>
                    {task.status}
                  </span>
                </p>
                <p>Assigned to: {assignedUser ? assignedUser.name : "Unknown"}</p>
                <Link to={`/taskdetail/${task._id}`} state={{ task }}>
                  View Details
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <Header props={"Task"} />
      <div className="Task height">
        {token && (
          <button onClick={() => navigate("/createTask")}>
            <Plus /> Create Task
          </button>
        )}
        {token ? renderTasks() : <h2 className="login1">You Should Login First!</h2>}
      </div>
    </div>
  );
}

export default Task;
