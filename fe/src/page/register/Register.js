import React from "react";
import './Register.css'

export default function Register() {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="register-tittle">Register account</h1>
        <form>
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" className="form-input" name="username" type="text" />
            </div>

            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" className="form-input" name="password" type="password" />
            </div>

            <div>
                <label htmlFor="sdt" className="form-label">Sdt</label>
                <input id="sdt" className="form-input" name="sdt" type="text" />
            </div>

            <div>
                <label htmlFor="address" className="form-label">Address</label>
                <input id="address" className="form-input" name="address" type="text" />
            </div>

            <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
}
