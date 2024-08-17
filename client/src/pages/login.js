import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform login logic (e.g., API call)
    // On successful login, redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className='loginPage'>
      <h2>Login</h2>
      <form className='loginForm' onSubmit={handleLogin}>
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

          <button
            type='submit'
            className='btn btn-primary'>Login</button>
        </div>
      </form>

      <div className='signup'>
        <p>Don't have an account?</p>
        <button
          onClick={() => navigate('/')}
          className='btn btn-success'>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
