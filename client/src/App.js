import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Coin from "./routes/Coin";
import Layout from "./pages/Layout";
import ContactUs from "./pages/contactUs";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <Layout user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
