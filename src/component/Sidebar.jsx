import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
   
      <div className="sidebar">
        <h2>UniTask</h2>
        <ul>
          <li><Link  to='/'>Home</Link></li>
          <li><Link  to='/dashboard'>Dashboard</Link></li>
          <li><Link  to='/task'>Task</Link></li>
          <li><Link  to='/user'>User</Link></li>
        </ul>
      </div>
 
  );
}

export default Sidebar;
