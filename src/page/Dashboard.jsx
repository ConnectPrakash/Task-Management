import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { FilePenLine } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Loader from "../components/loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Decode token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserId(null);
      }
    }
  }, [token]);

  // Fetch users and tasks
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [userRes, taskRes] = await Promise.all([
          axios.get("https://task-management-1-al5b.onrender.com/user"),
          axios.get("https://task-management-1-al5b.onrender.com/task"),
        ]);

        setUsers(userRes.data.data || []);
        setTasks(taskRes.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  // Watch for token changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filter tasks assigned to the logged-in user
  const userTasks = userId
    ? tasks.filter((task) => task.assignedUserId === userId)
    : [];

  // ✅ Static Chart Data for Testing
  const chartData = [
    { month: "Jan", tasksCompleted: 3 },
    { month: "Feb", tasksCompleted: 5 },
    { month: "Mar", tasksCompleted: 2 },
    { month: "Apr", tasksCompleted: 6 },
    { month: "May", tasksCompleted: 1 },
    { month: "Jun", tasksCompleted: 4 },
  ];

  return (
    <div>
      <Header props={"Dashboard"} />
      <div className="Task height">
        {!token ? (
          <h2 className="login1">You Should Login First!</h2>
        ) : loading ? (
          <Loader />
        ) : userTasks.length > 0 ? (
          <div>
            {/* ✅ Line Chart Section */}
            <div
              style={{
                width: "100%",
                height: "350px",
                backgroundColor: "white",
              }}
            >
              <h2 style={{ padding: "1rem", fontSize: "18px" }}>
                📈 Task Progress Overview
              </h2>
              <ResponsiveContainer width="95%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tasksCompleted"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Task List */}
            <ul>
              {userTasks.map((task) => {
                const createdUser = users.find(
                  (user) => user._id === task.createdId
                );
                return (
                  <li key={task._id}>
                    <FilePenLine
                      className="edit"
                      onClick={() => navigate(`/editTask/${task._id}`)}
                    />
                    <ToastContainer />
                    <div className="task-box">
                      <h2>Title: {task.title}</h2>
                      <p>Description: {task.description}</p>
                      <p>
                        Status:{" "}
                        <span
                          className={
                            task.status === "Process"
                              ? "yellow"
                              : task.status === "Completed"
                              ? "green"
                              : "red"
                          }
                        >
                          {task.status}
                        </span>
                      </p>
                      <p>
                        Created by: {createdUser ? createdUser.name : "Unknown"}
                      </p>
                      <Link to={`/taskdetail/${task._id}`} state={{ task }}>
                        View Details
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
