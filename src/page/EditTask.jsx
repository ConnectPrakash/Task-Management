import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const [task, setTask] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id", id);

  useEffect(() => {
    axios
      .get(`https://task-management-1-al5b.onrender.com/task/${id}`)
      .then((response) => {
        setTask(response.data.data);
        setStatus(response.data.data.status); // Initialize status with current task status
        callUser(response.data.data.createdId); // Pass createdId to callUser
        console.log("data", response.data.data);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  }, [id]);

  const callUser = (callerId) => {
    console.log("CallerId", callerId);
    axios
      .get(`https://task-management-1-al5b.onrender.com/user/${callerId}`)
      .then((response) => {
        setUser(response.data.data);
        console.log("User", response.data.data);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    console.log("title", task.title);
    console.log("description", task.description);
    console.log("status", status);

    // Sending updated data to backend
    axios
      .put(`https://task-management-1-al5b.onrender.com/task/${task._id}`, {
        title: task.title,
        description: task.description,
        status: status,
      })
      .then((response) => {
        console.log(response.data.data);
        navigate("/dashboard"); // Redirect to dashboard after successful update
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Show loading state until task or user is fetched
  if (!task || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header props="Edit Task" />
      <form className="Edit-controller" onSubmit={handleUpdate}>
        <div className="Edit-container">
          <label>Title : </label>
          <h3>{task.title} </h3>
        </div>
        <div className="Edit-container">
          <label>Description : </label>
          <h3> {task.description} </h3>
        </div>
        <div className="Edit-container">
          <label>Created By: </label>
          <h3>{user.name}</h3>
        </div>
        <div className="Edit-container">
          <label>Process : </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">To-Do</option>
            <option value="Process">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="Edit-container-button">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
