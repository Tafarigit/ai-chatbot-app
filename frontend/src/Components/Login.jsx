import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const API_URL = "http://localhost:3001"; // adjust if different

const Login = () => {
    const { loginUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(""); // for success/error messages
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
            const response = await axios.post(`${API_URL}/api/auth/login`, formData);
            console.log("User logged in:", response.data);
            loginUser(response.data);
            setMessage(`Login successful! Welcome back, ${response.data.username}`);
            setFormData({ email: "", password: "" });
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (err) {
            console.error("Login error:", err);
            setMessage(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
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
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};



export default Login;
