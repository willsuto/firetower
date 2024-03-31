import React from 'react';
import MapUI from './components/MapUI.jsx';
import LoginPage from './components/LoginPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MapUI />} />
      </Routes>
    </ Router>
  );
};

export default App;