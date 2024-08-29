import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './Login.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSignup = async (e) => {
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

    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If validation passes, send the data to the server
    try {
      const response = await axios.post('https://financial-data-web-app-2.onrender.com', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('Signup successful');
        setError('');
        navigate('/Dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);  // Log error details for debugging
      setError(err.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    
    <div className='addUser'>
      <h2>Sign Up</h2>
      <form className='addUserForm' onSubmit={handleSignup}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='off'
            placeholder='Enter your name'
          />

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

          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='off'
            placeholder='Confirm your password'
          />

          <button
            type='submit'
            className='btn btn-success'>Create my Account
          </button>
        </div>

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
      </form>

      <div className='switch'>
        <p>Already have an account?</p>
        <Link to='/login' className='btn btn-primary'>Sign In</Link>
      </div>
    </div>
 
  );
};

export default Signup;