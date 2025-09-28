import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Chatbot!</h1>
      <p style={styles.message}>Please register or login to start chatting with our AI assistant.</p>
      <div style={styles.buttonGroup}>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "100px auto",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  message: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "30px"
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center"
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "16px"
  }
};

export default Home;