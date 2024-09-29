import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import useAuth from "../../hook/useAuth";

const Homepage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="homepage">
      <nav>
        <div className="logo">Logo</div>
        <div className="logout" onClick={handleLogout}>
          logout <i className="fa-solid fa-right-from-bracket"></i>
        </div>
      </nav>
      <h1>hello 👋, {user?.user?.username}</h1>
    </div>
  );
};

export default Homepage;
