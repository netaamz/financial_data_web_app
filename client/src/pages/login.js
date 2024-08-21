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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true); // Start submitting

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false); // Stop submitting
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*()\\-_=+|[]{};:/?.><).'
      );
      setIsSubmitting(false); // Stop submitting
      return;
    }

    // If validation passes, send data to the server
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful') {

        // Save user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        setSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          setSuccess(''); // Clear success message
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login.');
    } finally {
      setIsSubmitting(false); // End submitting regardless of the outcome
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

          <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
            Login
          </button>
        </div>
        {isSubmitting && <p className='loading'>Logging in...</p>}
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
