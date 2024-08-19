import React from 'react';
import Navbar from "../components/Navbar.js";
import { Outlet } from 'react-router-dom'; // Used for rendering nested routes

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renders the current route's component */}
    </div>
  );
};

export default Layout;
