import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonInput from "../buttonInput/ButtonInput";
import { enqueueSnackbar } from "notistack";
import "./Signuppage.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiurl = import.meta.env.VITE_API_URL;
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiurl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        enqueueSnackbar(data.message || "Signup successful!", {
          variant: "success",
        });
        navigate("/login");
      } else {
        enqueueSnackbar(data.message || "Signup failed. Please try again.", {
          variant: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Network error. Please try again.", { variant: "error" });
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
        />
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
        <ButtonInput
          className=""
          title="Sign Up"
          onClick={handleSignup}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
