import React from "react";
import './Login.css'

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="login-tittle">Login account</h1>
        <form>
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" className="form-input" name="username" type="text" />
            </div>

            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" className="form-input" name="password" type="password" />
            </div>

            <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
}
