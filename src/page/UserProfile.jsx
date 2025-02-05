import React, { useEffect, useState } from "react";
import Header from "../component/header.jsx";
import axios from "axios";
import image from '../assets/male.jpg'

import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState([]);
  const [edit,setEdit] = useState(false);

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('');


  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, user not authenticated.");
    return <p>Please log in to view your profile.</p>;
  }

  const decode = jwtDecode(token);
  console.log("User ID:", decode.id);

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

  const handleEdit = () =>{
   setEdit(true);
  
  }
  useEffect(() => {
    axios
      .get(`https://task-management-1-al5b.onrender.com/user/${decode.id}`)
      .then((response) => {
        setUser(response.data.data || {});
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [decode.id]);

  if (!user) return <p>Loading...</p>;

  // Find the company name based on user.companyId
  const userCompany = company.find((comp) => comp._id === user.companyId);

  return (
    <div className="User-profile-container">
      <Header props="User Profile" />
      <div className="user-profile ">
        <div className="user-profile-img">
         
          <img src={image || "/default-profile.jpg"} alt="Profile" />
         
        </div>
        <button onClick={handleEdit}>Edit</button>
        <div>
          <h2>Name:</h2>
         {edit ? <input type="text" value={user.name}/>:<p>{user.name || "N/A"}</p>} 
        </div>
        <div>
          <h2>Email:</h2>
          {edit ? <input type="text"/> : <p>{user.email || "N/A"}</p>}
        </div>
        <div>
          <h2>Role:</h2>
          {edit ? <input type="text"/>:<p>{user.role || "N/A"}</p>}
        </div>
        <div>
          <h2>Company:</h2>
          <p>{userCompany ? userCompany.name : "Not assigned"}</p>
        </div>
        
      </div>
    </div>
  );
}

export default UserProfile;
