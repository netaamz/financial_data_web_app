import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "../components/Coins.js";
import { Route, Routes } from "react-router-dom";
import Coin from "../routes/Coin.js";

const Dashboard = () => {
    const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50";
  const [coins, setCoins] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalMarketCap, setTotalMarketCap] = useState(0);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        //console.log(response.data[0]);
        // Update state with the number of companies and total market cap
        setTotalCompanies(response.data.length);
        const marketCapSum = response.data.reduce((acc, coin) => acc + coin.market_cap, 0);
        setTotalMarketCap(marketCapSum);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="container mt-4"> {/* Use Bootstrap container for responsive padding */}
      <div className="text-center mb-4 bg-dark text-white p-3 rounded">
        {/* Remove vh-100 and adjust margins for spacing */}
        <h2>Largest Companies by Market Cap</h2>
        <p>Companies: <strong>{totalCompanies}</strong></p>
        <p>Total Market Cap: <strong>${(totalMarketCap / 1e12).toFixed(3)} T</strong></p>
      </div>

      {/* The coin list is rendered below the market cap information */}
      <Routes>
        <Route path="/" element={<Coins coins={coins} />} />
        <Route path="coin/:coinId" element={<Coin />} />
      </Routes>
    </div>
  );
}

export default Dashboard;