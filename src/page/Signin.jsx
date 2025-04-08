import axios from "axios";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Signin() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [role, setRole] = useState("Admin");
   const [companyId, setCompanyId] = useState("");
   const [companyKey, setCompanyKey] = useState("");

   // Company details (only for Admin)
   const [companyName, setCompanyName] = useState('');
   const [companyWebsite, setCompanyWebsite] = useState('');
   const [companyAddress, setCompanyAddress] = useState('');

   const [admin, setAdmin] = useState(true);  // Default to false

   const [message, setMessage] = useState(""); 
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleRole = (e) => {
      const selectedRole = e.target.value;
      setRole(selectedRole);
      setAdmin(!admin);  // Fix:Use selectedRole
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      setMessage("");

      axios.post("https://task-management-1-al5b.onrender.com/user/register", { 
         name,
         email,
         password,
         role,
         isSuperAdmin: false,
         companyName: admin ? companyName : null,
         companyAddress: admin ? companyAddress : null,
         companyWebsite: admin ? companyWebsite : null,
         companyId: !admin ? companyId : null,  // Fix: Employees must provide companyId
         securityKey: companyKey// Fix: Employees enter companyKey
      })
      .then((response) => {
         toast("User registered successfully! ✅");
         navigate('/login');
      })
      .catch((error) => {
         setMessage(error.response?.data?.message || "Registration failed ❌");
      })
      .finally(() => {
         setLoading(false);
      });
   };

   return (
      <div className="register">
         <h2>Register</h2>
         <form onSubmit={handleSubmit}>
            <div className="login-container">
               <div className="image-container1">
                  <div className="input">
                     <label>Name</label>
                     <input 
                        type="text" 
                        placeholder="Name..." 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                     />
                  </div>
                  <div className="input">
                     <label>Email</label>
                     <input 
                        type="email" 
                        placeholder="Enter Email..." 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <div className="input">
                     <label>Password</label>
                     <input 
                        type="password" 
                        placeholder="Enter Password..." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                     />
                  </div>
               </div>
               <div className="input-container">
                  <div className="input">
                     <label>Role</label>
                     <select value={role} onChange={handleRole} required>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                     </select>
                  </div>
                  
                
                     <div className="input">
                        <label>Security Key</label>
                        <input 
                           type="text" 
                           placeholder="Enter Security Key"  
                           value={companyKey} 
                           onChange={(e) => setCompanyKey(e.target.value)} 
                           required
                        />
                     </div>
              
               </div>
            </div>

            {admin && (
               <div className="Company-details">
                  <h2>Company Profile</h2>
                  <div className="input">
                     <label>Company Name</label>
                     <input 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                        required
                     />
                  </div>
                  <div className="input">
                     <label>Website</label>
                     <input 
                        value={companyWebsite} 
                        onChange={(e) => setCompanyWebsite(e.target.value)} 
                        required
                     />
                  </div>
                  <div className="input">
                     <label>Address</label>
                     <input 
                        value={companyAddress} 
                        onChange={(e) => setCompanyAddress(e.target.value)} 
                        required
                     />
                  </div>
               </div>
            )}

            <div className="input">
               <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
               </button>
            </div>
         </form>

         {message && <p className={`message ${message.includes("❌") ? "error" : ""}`}>{message}</p>}

         <p className="link">
            If you already have an account <Link to="/login">Login</Link>
         </p>
         <ToastContainer />
      </div>
   );
}

export default Signin;
