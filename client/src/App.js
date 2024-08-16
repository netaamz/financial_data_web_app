import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins.js";
import Navbar from "./components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin.js";
import Dashboard from "./pages/Dashboard.js";


function App() {

  return (
    <div className="app">
      <Dashboard/>
    </div>
  );
}

export default App;
