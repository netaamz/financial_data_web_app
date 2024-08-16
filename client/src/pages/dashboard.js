import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "../components/Coins.js";
import Navbar from "../components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Coin from "../routes/Coin.js";
import Signup from "./Signup.js";

const Dashboard = () => {
    const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50";
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Coins coins={coins}/>}/>
        <Route path='/coin' element= {<Coin/>}>
        <Route path=':coinId' element={<Coin/>}/></Route>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    
      
    </>
  );
}

export default Dashboard