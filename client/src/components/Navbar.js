import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

import './Navbar.css'

const Navbar = () => {
  return (
    <Link to='/'>
      <div className="navbar">
        <FaCoins className="icon"/>
        <h1>
          {" "}
          Coin<span className="search"> Search</span>
        </h1>
        <div className="nav-right"> 
          <select>
            <option value="usd">USD</option>
            <option value="nis">NIS</option>
            <option value="eur">EUR</option>
          </select>
          <Link to='/signup'>
          <button>Sign up <GoArrowUpRight className="SignUp-icon" /></button>
          </Link>


        </div>

      </div>
    </Link>
  );
};

export default Navbar;
