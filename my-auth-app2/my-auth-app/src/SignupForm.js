import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./components/fire"; // Import createUserWithEmailAndPassword from fire.js
import "./components/sign.css";
import { useNavigate } from "react-router-dom/dist";
import User_icon from "./components/email.png";
import pass_icon from "./components/padlock.png";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword from fire.js
      alert("Email ID Registered successfully. Please Login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>SignUp</h2>
      </div>
      <form onSubmit={handleSignup}>
        <div className="input-icon-container">
          <img src={User_icon} alt="" className="input-icon" />
          <input
            type="email"
            placeholder="EmailID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-icon-container">
          <img src={pass_icon} alt="" className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">SignUp</button>
        <hr></hr>
        <div className="log">
          <center>
            <p>If you Already have an Account Please Login</p>
            <button type="button" onClick={() => navigate("/login")}>
              Login
            </button>
          </center>
        </div>
      </form>
    </div>
  );
};

export default Signup;
