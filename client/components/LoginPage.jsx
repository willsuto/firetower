import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fireIcon from '../images/fireIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { userSet } from '../reducers/userSlice';
import getFires from '../../utilities/getFires';
import { firesFetched } from '../reducers/firesSlice'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user)
  useEffect(() => {
    async function setFiresState () {
      const firesArray = await getFires();
      dispatch(firesFetched(firesArray));
    };
    setFiresState();
  }, [])

  // Login
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
 
      const user = await response.json();

      if (user.username) {
        dispatch(userSet(user));
        navigate('/home');
      } else (alert(user));

    } catch (error) { console.error({'Error occurred during login': error}) }

  };

  // Sign up
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
      if (message === 'User already exists') alert('User already exists')
      else alert(message);

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
