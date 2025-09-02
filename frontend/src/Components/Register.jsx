import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth"; // <-- import the custom hook

const API_URL = "http://localhost:3001";

const Register = () => {
  const { loginUser } = useAuth(); // <-- access loginUser function from context
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      console.log("User registered:", response.data);

      // Automatically log in the new user
      loginUser(response.data);

      setMessage(`Registration successful! Welcome, ${response.data.username}`);
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
