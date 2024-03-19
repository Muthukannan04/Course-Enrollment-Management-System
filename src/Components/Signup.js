import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'; 

export const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    axios.post("http://localhost:3001/user", { username, email, password })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSignup}>
        <label>Username:</label>
        <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} /><br />
        <label>Password:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <label>Email:</label>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <button type='submit'>Signup</button><br />
        <Link to="/login" id='signuplink'>Already have an account? Login</Link>
      </form>
    </div>
  );
}
