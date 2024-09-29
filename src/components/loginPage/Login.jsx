import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonInput from "../buttonInput/ButtonInput";
import { enqueueSnackbar } from "notistack";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiurl=import.meta.env.VITE_API_URL
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiurl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        enqueueSnackbar(data.message || "Login successful!", {
          variant: "success",
        });
        console.log(data?.token);
        localStorage.setItem("token", data?.token);
        navigate("/homepage");
      } else {
        enqueueSnackbar(data.message || "Login failed. Please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Network error. Please try again.", { variant: "error" });
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
        <span>or use your email password</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <a href="#">Forget Your Password?</a>

        <ButtonInput
          className=""
          title="Sign In"
          onClick={handleLogin}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
