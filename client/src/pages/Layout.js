import React from 'react';
import Navbar from "../components/Navbar.js";
import { Outlet } from 'react-router-dom';

const Layout = ({ user, setUser }) => {
  return (
    <div>
      <Navbar user={user} setUser={setUser} /> {/* Pass user and setUser to Navbar */}
      <Outlet />
    </div>
  );
};

export default Layout;
