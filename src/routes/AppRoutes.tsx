import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import ProtectedRoute from "./ProtectedRoutes";
import People from "../components/common/People";
import Saved from "../components/common/Saved";
import CreatePost from "../components/common/CreatePost";
import ProtectedLayout from "../components/layout/ProtectedLayout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/people" element={<People />} />
          <Route path="/post" element={<CreatePost />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
