import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import fireIcon from '../images/fireIcon.png';
// const fireIcon = require('../images/fireIcon.png');
import fireIcon from '../images/fireIcon.png'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })
 
      const message = await response.json();
      console.log(message);

      if (message === 'Login successful') navigate('/home')
      else (alert('Login unsuccessful'));

    } catch (error) { console.error({'Error occurred during login': error}) }

  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      
      const message = await response.json();
      if (message === 'User already exists') alert('User already exists');

    } catch (error) { console.error({'Error occurred during signup': error}) };
    
  };

  return (
    <div className='loginPage' style={{backgroundImage: `url(${fireIcon})`} }>
      <div className='loginBox' >  
        <h1>FireTower</h1>
        <h2>Log In Or Sign Up</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleLogin}>Log In</button>
          <hr></hr>
          <button type="submit" onClick={handleSignup}>Sign Up</button>
        </form>
      </div>   
    </div>
  );
};

export default LoginPage;
