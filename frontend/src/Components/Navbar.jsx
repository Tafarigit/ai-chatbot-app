import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth"; // your custom hook

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {!user && (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        {user && (
          <>
            <li>Welcome, {user.username}</li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
          </>
        )}
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;



