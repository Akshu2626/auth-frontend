import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/loginPage/Login";
import Signup from "./components/signupPage/SignupPage";
import Homepage from "./components/homepage/Homepage";
import useAuth from "./hook/useAuth";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {!isAuthenticated && <Route path="/login" element={<Login />} />}
      {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
      {!isAuthenticated && <Route path="/" element={<Login />} />}
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  );
};

export default AppRoutes;
