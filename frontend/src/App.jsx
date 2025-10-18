import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chatbox from "./Components/Chatbox";
import { useAuth } from "./Components/useAuth";
import InterviewCoach from "./Components/InterviewCoach";


function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={user ? null : <Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* {user && <Chatbox />} */}
        {user && <InterviewCoach />}
      </Router>
    </div>
  );
}

export default App;
