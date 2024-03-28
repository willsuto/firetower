import React, { useState } from 'react';

const TestServer = () => {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('api/test');
      const data = await response.json();
      console.log('data', data)
      setMessage(response.message);
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <button onClick = {handleClick}>Test the server</button>
      <p>{message}</p>
    </>
  );
};

export default TestServer;

