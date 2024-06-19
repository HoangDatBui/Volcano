import "../styling/Logout.css"
import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = () => {
      setTimeout(() => {
        logout();
        navigate("/");
      }, 1500);
    };

    handleLogout();
  }, [navigate, logout]);

  return <Alert className="error-message">You have been logged out.</Alert>;
}
