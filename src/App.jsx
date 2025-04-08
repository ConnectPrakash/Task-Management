import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/loader";

// Lazy load pages
const Home = lazy(() => import("./page/Home"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Task = lazy(() => import("./page/Task"));
const User = lazy(() => import("./page/User"));
const TaskDetail = lazy(() => import("./page/TaskDetail"));
const Login = lazy(() => import("./page/Login"));
const Signin = lazy(() => import("./page/Signin"));
const UserDetail = lazy(() => import("./page/UserDetail"));
const NewTask = lazy(() => import("./page/NewTask"));
const UserProfile = lazy(() => import("./page/UserProfile"));
const EditTask = lazy(() => import("./page/EditTask"));

function App() {
  return (
    <div className="divide-page">
      <Sidebar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/user" element={<User />} />
          <Route path="/taskdetail/:id" element={<TaskDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/createTask" element={<NewTask />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/editTask/:id" element={<EditTask />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
