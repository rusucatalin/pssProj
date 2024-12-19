import HomeLayout from "layout/main/MainLayout";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="home/*" element={<HomeLayout />} />
      <Route path="/" element={<Navigate to="/home/homePage" replace />} />
    </Routes>
  );
};

export default App;
