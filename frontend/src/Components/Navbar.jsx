import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <ul>
        {!user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;