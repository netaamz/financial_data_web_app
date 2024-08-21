import React, { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
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

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    
      <div className="navbar">
        <Link to='/dashboard'>
        <FaCoins className="icon"/>
        <h1>
          {" "}
          Crypto<span className="search"> Data</span>
        </h1>
        </Link>
        <div className="nav-right"> 
          <Link to='/contactUs'>
            <button>Contact Us <IoChatbubblesOutline /></button>
          </Link>
          {user ? (
            <UserDropdown user={user} onLogout={handleLogout} />
          ) : (
            <button onClick={handleLoginClick}>Log In <BsPersonCircle /></button>
          )}
        </div>
      </div>
    
  );
};

export default Navbar;
