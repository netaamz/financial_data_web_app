import React, {  useEffect } from "react";
import { FaCoins } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import UserDropdown from './UserDropdown'; // Import the UserDropdown component

import './Navbar.css'

const Navbar = ({ user,setUser }) => {
  //const [user, setLocalUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        //console.log('Retrieved user:', parsedUser); // Debugging statement
        //setLocalUser(parsedUser);
        //if (setUser) setUser(parsedUser); // Ensure setUser is called
        if(!user){
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
        if (setUser) setUser(null);
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    //setLocalUser(null);
    //if (setUser) setUser(null);// Ensure setUser is called on logout
    setUser(null);
    navigate('/'); // Redirect to the homepage or login page
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const renderAuthButtons = () => {
    if (user) {
      return <div className="nav-right"> <UserDropdown  user={user} onLogout={handleLogout} /></div>;
    } else {
      return (
        <button onClick={handleLoginClick}>
          Log In <BsPersonCircle aria-label="Login Icon" />
        </button>
      );
    }
  };

  return (

    <div className="navbar">
      <Link to={user ? '/dashboard' : '/login'} className="navbar-logo">
        <FaCoins className="navbar-icon" aria-label="Bitcoin Icon" />
        <h1 className="hide-mobile">Crypto Data</h1>
      </Link>
      <div className="nav-right">
        <Link to='/contactUs'>
          <button> <span className="hide-mobile">Contact Us</span> <IoChatbubblesOutline /></button>
        </Link>
        {renderAuthButtons()}
      </div>
    </div>

  );
};

export default Navbar;
