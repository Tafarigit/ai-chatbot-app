// 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chatbox from "./Components/Chatbox";
import { useAuth } from "./Components/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Home page - only show if not logged in */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/chatbot" /> : <Home />} 
          />
          
          {/* Auth routes - redirect to chatbot if already logged in */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/chatbot" /> : <Register />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/chatbot" /> : <Login />} 
          />
          
          {/* Protected chatbot route - only accessible when logged in */}
          <Route 
            path="/chatbot" 
            element={user ? <Chatbox /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;