// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h2>Welcome back, {user.username}!</h2>
      ) : (
        <>
          <h2>Welcome! Please login or register to start chatting.</h2>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Home;


