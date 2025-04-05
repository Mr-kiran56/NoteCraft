import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notestate"; 
import Alert from "./components/Alert"; 
// import Chatbot from "./components/Chatbot";
import ChatBot from "./components/ChatBot";
import Profile from "./components/Profile"


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Intro from "./components/Intro";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

 
  return (
    <NoteState>
      <Router>
        <Navbar /> 
        <Alert alert={alert} /> 
        
        <Routes>
          <Route path="/intro" element={<Intro setAlert={showAlert}/>}/>
          <Route path="/login" element={<Login  setAlert={showAlert} />} />
          <Route path="/chatbot" element={<ChatBot setAlert={showAlert}/>}/>
          <Route path="/" element={<Home setAlert={showAlert} />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signup" element={<SignUp setAlert={showAlert}  />} />
        </Routes>

      </Router>
    </NoteState>
  );
}

export default App;
