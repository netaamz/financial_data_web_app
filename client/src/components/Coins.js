import React, { useState } from 'react';
import CoinItem from './CoinItem';
import Coin from '../routes/Coin';
import { Link } from 'react-router-dom';

const Coins = (props) => {
  // State for sorting, null by default to maintain initial rank sorting
  const [sortConfig, setSortConfig] = useState(null);

  // Function to handle sorting
  const sortCoins = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to perform sorting
  const sortedCoins = sortConfig
    ? [...props.coins].sort((a, b) => {
        if (sortConfig.key === 'name') {
          if (a.name < b.name) return sortConfig.direction === 'asc' ? -1 : 1;
          if (a.name > b.name) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        } else if (sortConfig.key === 'price') {
          return sortConfig.direction === 'asc'
            ? a.current_price - b.current_price
            : b.current_price - a.current_price;
        } else if (sortConfig.key === 'volume') {
          return sortConfig.direction === 'asc'
            ? a.total_volume - b.total_volume
            : b.total_volume - a.total_volume;
        } else if (sortConfig.key === 'market_cap') {
          return sortConfig.direction === 'asc'
            ? a.market_cap - b.market_cap
            : b.market_cap - a.market_cap;
        }
        return 0;
      })
    : props.coins; // Return unsorted coins (default rank order)

  return (
    <div className='container'>
      <div>
        <div className='heading'>
          <p>#</p>
          <p className='coin-name' onClick={() => sortCoins('name')}>
            Coin {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p onClick={() => sortCoins('price')}>
            Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p>24h</p>
          <p className='hide-mobile' onClick={() => sortCoins('volume')}>
            Volume {sortConfig?.key === 'volume' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p className='hide-mobile' onClick={() => sortCoins('market_cap')}>
            Mkt Cap {sortConfig?.key === 'market_cap' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
        </div>
        {sortedCoins.map((coin, index) => {
          return (
            <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
              <CoinItem coins={coin} index={index + 1} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Coins;
