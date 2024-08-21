import React from 'react';
import './Coins.css';

const CoinItem = (props) => {
  const { price_change_percentage_24h } = props.coins;

  const formatPercentage = (percentage) => {
    if (percentage < 0) {
      return (
        <span className="negative-change">
          ▼ {Math.abs(percentage).toFixed(2)}%
        </span>
      );
    } else {
      return (
        <span className="positive-change">
          ▲ {percentage.toFixed(2)}%
        </span>
      );
    }
  };

  return (
    <div className='coin-row'>
      <p>{props.coins.market_cap_rank}</p>
      <div className='img-symbol'>
        <img src={props.coins.image} alt='' />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p>${props.coins.current_price.toLocaleString()}</p>
      <p>{formatPercentage(price_change_percentage_24h)}</p>
      <p className='hide-mobile'>${props.coins.total_volume.toLocaleString()}</p>
      <p className='hide-mobile'>${props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
