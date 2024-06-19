import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function Nav() {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/VolcanoList">Volcano List</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/Logout">Log out</Link>
            ) : (
              <Link to="/Login">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
