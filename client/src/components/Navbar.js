import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdContact } from "react-icons/io";

import './Navbar.css'

const Navbar = () => {
  return (
    <Link to='/dashboard'>
      <div className="navbar">
        <FaCoins className="icon"/>
        <h1>
          {" "}
          Coin<span className="search"> Search</span>
        </h1>
        <div className="nav-right"> 
          <Link to='/contactUs'>
          <button>Contact Us <IoMdContact /></button>
          </Link>
          <Link to='/'>
          <button className="logout-button">Logout<GoArrowUpRight className="logout-icon" /></button>
          </Link>



        </div>

      </div>
    </Link>
  );
};

export default Navbar;
