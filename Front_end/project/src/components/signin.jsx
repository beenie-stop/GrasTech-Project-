import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav"; 
import "../css/signin.css"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Form is blank");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token saved in localStorage:", res.data.token);
        alert("Login successful!");
        navigate("/todo"); 
      } else {
        alert("No token received!");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert("Login failed. Please try again.");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <div className="leftside"></div>
      <div className="rightside">
        <div className="form">
          <h1>Sign In</h1>
          <form onSubmit={submitHandler}>
            <h2>Email:</h2>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h2>Password:</h2>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
          <h3>
            Don't have an account? <Nav />
          </h3>
        </div>
      </div>
    </div>
  );
}
