import React, { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import { GoArrowUpRight } from "react-icons/go";
import { IoMdContact } from "react-icons/io";
import UserDropdown from './UserDropdown'; // Import the UserDropdown component

import './Navbar.css'

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Retrieved user:', parsedUser); // Debugging statement
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to the homepage or login page
  };


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
          <UserDropdown user={user} onLogout={handleLogout} />

        </div>
      </div>
    </Link>
  );
};

export default Navbar;
