import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './Singup.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added state for error handling

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Perform signup logic (e.g., API call)
      // This is where you would make your API call to register the user
      // For example:
      // const response = await axios.post('/api/signup', { name, email, password });
      // if (response.data.success) {
      //   navigate('/dashboard');
      // } else {
      //   setError(response.data.message || 'Signup failed');
      // }
      
      // For demonstration, we'll assume signup is always successful:
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('An error occurred during signup. Please try again.');
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

          <button
            type='submit'
            className='btn btn-success'>Sign Up
          </button>
        </div>
        
        {error && <p className='error'>{error}</p>} {/* Display error message if any */}
      </form>

      <div className='login'>
        <p>Already have an account?</p>
        <Link to='/login' className='btn btn-primary'>Login</Link>
      </div>
    </div>
  );
};

export default Signup;