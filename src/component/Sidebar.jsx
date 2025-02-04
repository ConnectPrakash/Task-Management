import React from "react";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
   
      <div className="sidebar">
        <h2>UniTask</h2>
        <ul>
          <li><NavLink activeClassName='active-link' to='/'>Home</NavLink></li>
          <li><NavLink activeClassName='active-link' to='/dashboard'>Dashboard</NavLink></li>
          <li><NavLink activeClassName='active-link' to='/task'>Task</NavLink></li>
          <li><NavLink activeClassName='active-link' to='/user'>User</NavLink></li>
        </ul>
      </div>
 
  );
}

export default Sidebar;
