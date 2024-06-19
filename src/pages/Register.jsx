import "../styling/Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const url = `http://4.237.58.241:3000/user/register`;

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setMessage("Your passwords don't match!");
      return;
    }

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
        // Throw an error with the error message or default "Registration failed" message
        throw new Error(errorData.message || "Registration failed");
      }
      setMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>USER REGISTRATION</h1>
      <form className="register-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="example@email.com" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="********" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" placeholder="********" />
        {message && ( // If user register successfully -> success-message, error-message otherwise
          <div
            className={`${
              message.startsWith("Registration successful") ? "success" : "error"
            }-message`}
          >
            {message}
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
