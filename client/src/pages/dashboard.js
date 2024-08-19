import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "../components/Coins.js";
import { Route, Routes } from "react-router-dom";
import Coin from "../routes/Coin.js";

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
      <Routes>
        <Route path="/" element={<Coins coins={coins} />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
    </>
  );
}

export default Dashboard;