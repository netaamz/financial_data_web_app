import React from 'react'
import './Singup.css'; 
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Signup = () => {
  return (
    <div className='addUser'>
      <h2>Sign Up</h2>
      <form className='addUserForm'>
        <div className='inputGroup'>
          <label htmlFor='name'>Name:</label>
          <input
          type='text'
          id='name'
          autoComplete='off'
          placeholder='Enter your name'
          />

          <label htmlFor='email'>Email:</label>
          <input
          type='text'
          id='email'
          autoComplete='off'
          placeholder='Enter your email'
          />

          <label htmlFor='password'>Password:</label>
          <input
          type='password'
          id='password'
          autoComplete='off'
          placeholder='Enter password'
          />

          <button
          type='submit'
          class='btn btn-success'>Sign Up</button>

        </div>
      </form>

      <div className='login'>
        <p>Already have an account?</p>
        <button
          type='submit'
          class='btn btn-primary'>Login</button>
      </div>
    </div>
  );
};

export default Signup;