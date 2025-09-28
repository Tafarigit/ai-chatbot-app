import { useState } from "react";
import { Link } from "react-router-dom"; // Add this missing import
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData
      );
      loginUser(res.data);
      setFormData({ username: "", email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new password"
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/login">Already have an account? Login</Link>
      </p>
    </div>
  );
};

export default Register;
