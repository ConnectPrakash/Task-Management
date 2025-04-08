import React, { useEffect, useState } from "react";
import Header from "../component/header";
import axios from "axios";
import image from '../assets/male.jpg'
import { useNavigate } from "react-router-dom";

function User() {
  const [tasks, setTasks] = useState([]);
  const [company, setCompany] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://task-management-1-al5b.onrender.com/user")
      .then((response) => {
        setTasks(response.data.data || []);
        console.log("Users:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://task-management-1-al5b.onrender.com/company")
      .then((response) => {
        setCompany(response.data.data || []);
        console.log("Companies:", response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  return (
    <div>
      <Header props={"User"} />
      <div className="User-container height">
        <ul>
          {tasks.map((task) => {
            if (!company.length) return null;

            const companyData = company.find(
              (comp) => comp._id === task.companyId
            );

            return (
              <li key={task._id} onClick={()=>navigate(`/user/${task._id}`)}>
                <div className="User-img">
                  <img src={image} alt="default"/>
                </div>
                <div className="User-item">

                  <h2>{task.name}</h2>
                  <p>{task.email}</p>
                  <p>{companyData ? companyData.name : "Unknown Company"}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default User;
