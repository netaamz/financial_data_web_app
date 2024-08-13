import React, { useState, useEffect } from "react";
import axios from "axios";
import Coins from "./components/Coins.js";
function App() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10";
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
      <Coins coins={coins}></Coins>
    </>
  );
}

export default App;
