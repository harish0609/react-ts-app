import { useState } from "react";
import "./loginpage.scss"

const LoginPage = () => {
    
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Login</h2>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
