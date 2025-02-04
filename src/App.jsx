import { useState } from "react";
import { Route, Routes} from 'react-router-dom'
import "./App.css";
import Sidebar from "./component/Sidebar";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Task from "./page/Task";
import User from "./page/User";
import TaskDetail from "./page/TaskDetail";
import Login from "./page/Login";
import Signin from "./page/Signin";
import UserDetail from "./page/UserDetail";
import NewTask from "./page/NewTask";
import UserProfile from './page/UserProfile';
import EditTask from "./page/EditTask";

function App() {
  return (
    <div className="divide-page">
      <Sidebar/>
     
      <Routes className='home-body'>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/task' element={<Task/>}></Route>
        <Route path="/user" element={<User/>}/>
        <Route path="/taskdetail/:id" element={<TaskDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/user/:id" element={<UserDetail/>}/>
        <Route path="/createTask" element={<NewTask/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/editTask/:id" element={<EditTask/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
