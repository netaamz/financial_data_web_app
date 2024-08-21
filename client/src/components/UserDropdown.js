import React from 'react';
import './UserDropdown.css'; // Import the CSS file

const UserDropdown = ({ user, onLogout }) => {
  const handleDropdownChange = (e) => {
    if (e.target.value === 'logout') {
      onLogout();
    }
  };

  return (
    <div className="user-dropdown">
      <label htmlFor="user-dropdown" className="sr-only">User menu</label>
      <select 
        id="user-dropdown" 
        onChange={handleDropdownChange} 
        value="user" 
        aria-label="User menu"
      >
        <option value="user" disabled>{user ? `Hello, ${user.name}` : 'User'}</option>
        <option value="logout">Logout</option>
      </select>
    </div>
  );
};

export default UserDropdown;
