import React, { useEffect, useState } from 'react';
import { UseAuth } from './Auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const Navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);
  const auth = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/user")
      .then(res => setUserList(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const userExist = userList.some(u => u.username === username && u.password === password);
    if (userExist) {
      auth.Login(username);
      navigate('/');
    } else {
      alert("Invalid user and password");
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} /><br />
        <label>Password:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type='submit'>Login</button>
      </form>
      <Link to="/signup" id='signuplink'>Don't have an account? Sign up now!</Link>
    </div>
  );
}

export default Login;
