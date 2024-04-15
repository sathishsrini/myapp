import React, { useState } from "react";
import './components/login.css';
import { signInWithEmailAndPassword } from "./components/fire"; // Import signInWithEmailAndPassword
import { useNavigate } from "react-router-dom";
import User_icon from './components/email.png';
import pass_icon from './components/padlock.png';
import { auth } from "./components/fire";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(email + " " + password);
      navigate("/home");
      setUser(email);
    } catch(error) {
      console.log(error);
      alert(error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the password reset email.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-icon-container">
          <img src={User_icon} alt="" className="input-icon" />
          <input type="email" placeholder="EmailID" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-icon-container">
          <img src={pass_icon} alt="" className="input-icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="forgot-password">
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
