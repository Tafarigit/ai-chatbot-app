import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Users from "./Components/Users";
// import Messages from "./Components/Messages";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Chatbox from "./Components/Chatbox";
import { useAuth } from "./Components/useAuth"; // custom hook to access auth context   

function App() {
    const { user } = useAuth(); // get logged-in user
    return (
        <div className="app-container">
           <Router>
             <Navbar />
               <Routes>
                   <Route path="/" element={<Home />} /> 
                    <Route path="/navbar" element={<Navbar />} />
                   <Route path="/register" element={<Register />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/users" element={<Users />} />
                   {/* <Route path="/messages" element={<Messages />} /> */}
            </Routes>
            {user && <Chatbox />}
        </Router>
        </div>
    );
}

export default App;