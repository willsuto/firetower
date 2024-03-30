import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fireIcon from '../images/fireIcon.png'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
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

      if (message === 'Login successful') navigate('/home');
    } catch (error) { console.error({'Error occurred during login': error}) }

  };

  const handleSignupSubmit = async (e) => {
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
      console.log(message)
      // if (response.ok === true) {
      //   // navigate('/home');
      //   console.log(`Welcome ${username}`);
      // } else { console.error('Auth failed')};

    } catch (error) { console.error({'Error occurred during signup': error}) };
    
  };

  return (
    <div className='loginPage'>
      <div className='loginBox'>  
        <h2>Login Or Sign Up</h2>
        <form onSubmit={handleLoginSubmit}>
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
          <button type="submit">Login</button>
        </form>

        <form onSubmit={handleSignupSubmit}>
          <div>
            <label htmlFor="username-signup">Username:</label>
            <input
              type="text"
              id="username-signup"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password-signup">Password:</label>
            <input
              type="password"
              id="password-signup"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>   
    </div>
  );
};

export default LoginPage;
