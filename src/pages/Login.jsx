import "../styling/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [message, setMessage] = useState(null);
  const url = `http://4.237.58.241:3000/user/login`;
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Throw an error with the error message or default "Login failed" message
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      login();
      setMessage("Login successful!"); // Set success message
      setTimeout(() => navigate("/VolcanoList"), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      setMessage(error.message); // Set error message
    }
  };

  return (
    <div className="login-container">
      <h1>USER LOGIN</h1>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="example@email.com" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="********" />
        {message && ( // If user login successfully -> success, error otherwise
          <div
            className={`${
              message.startsWith("Login successful") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
        <button type="submit">Login</button>
        <div className="register-link">
          <span>Haven't had an account?</span>{" "}
          <button onClick={() => navigate("/Register")}>Register here!</button>
        </div>
      </form>
    </div>
  );
}
