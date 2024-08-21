import React from 'react';


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
        value={user ? 'user' : ''} 
        aria-label="User menu"
      >
        <option value='' disabled>{user ? `Hello, ${user.name}` : 'User'}</option>
        <option value='logout'>Logout</option>
      </select>
    </div>
  );
};

export default UserDropdown;
