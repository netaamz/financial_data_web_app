import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:/?.><]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*()\\-_=+|[]{};:/?.><).'
      );
      return;
    }

    // If validation passes, send data to the server
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful') {
        setSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className='addUser'>
      <h2>Sign In</h2>
      <form className='addUserForm' onSubmit={handleLogin}>
        <div className='inputGroup'>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            placeholder='Enter your email'
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            placeholder='Enter password'
          />

          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </div>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
      </form>

      <div className='signup'>
        <p>Don't have an Account?</p>
        <Link to='/' className='btn btn-success'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
