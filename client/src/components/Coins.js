import React, { useState, useEffect } from 'react';
import CoinItem from './CoinItem';
import Coin from '../routes/Coin';
import { Link } from 'react-router-dom';

const Coins = (props) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [sortedCoins, setSortedCoins] = useState([]);

  const [rankBy, setRankBy] = useState('market_cap'); // State for 'Rank by' selection


  // Function to handle sorting based on button click
  const sortCoins = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let coinsWithIndex = props.coins.map((coin, index) => ({
      ...coin,
      originalIndex: index, // Store the original index for sorting by '#'
    }));

    const sortedCoins = sortConfig
      ? [...coinsWithIndex].sort((a, b) => {
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
          } else if (sortConfig.key === '24h') {
            return sortConfig.direction === 'asc'
              ? a.price_change_percentage_24h - b.price_change_percentage_24h
              : b.price_change_percentage_24h - a.price_change_percentage_24h;
          } else if (sortConfig.key === '#') {
            
            return sortConfig.direction === 'asc'
              ? a.originalIndex - b.originalIndex
              : b.originalIndex - a.originalIndex;
          }
          return 0;
        })
      : coinsWithIndex;

    setSortedCoins(sortedCoins);
  }, [props.coins, sortConfig]);

  return (
    <div className='container'>
      {/* Rank by options */}
      <div className='hide-mobile'>
      <div className="rank-by-container">
        <span>Rank by:</span>
        <button
          className={`btn ${rankBy === 'name' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => { setRankBy('name'); sortCoins('name'); }}
        >
          Coin {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
        </button>
        <button
          className={`btn ${rankBy === 'price' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => { setRankBy('price'); sortCoins('price'); }}
        >
          Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
        </button>
        <button
          className={`btn ${rankBy === '24h' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => { setRankBy('24h'); sortCoins('24h'); }}
        >
          24h {sortConfig?.key === '24h' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
        </button>
        <button
          className={`btn ${rankBy === 'volume' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => { setRankBy('volume'); sortCoins('volume'); }}
        >
          Volume {sortConfig?.key === 'volume' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
        </button>
        <button
          className={`btn ${rankBy === 'market_cap' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => { setRankBy('market_cap'); sortCoins('market_cap'); }}
        >
          Mkt Cap {sortConfig?.key === 'market_cap' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
        </button>
      </div>
      </div>
      {/* Table header with sorting */}
      <div>
        <div className='heading'>
          <p onClick={() => sortCoins('#')}>
            # {sortConfig?.key === '#' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p className='coin-name' onClick={() => sortCoins('name')}>
            Coin {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p onClick={() => sortCoins('price')}>
            Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p onClick={() => sortCoins('24h')}>
            24h {sortConfig?.key === '24h' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p className='hide-mobile' onClick={() => sortCoins('volume')}>
            Volume {sortConfig?.key === 'volume' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
          <p className='hide-mobile' onClick={() => sortCoins('market_cap')}>
            Mkt Cap {sortConfig?.key === 'market_cap' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </p>
        </div>
        {sortedCoins.map((coin, index) => (
          <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
            <CoinItem coins={coin} index={index + 1} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Coins;
