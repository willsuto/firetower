import React from 'react';
import MapUI from './components/MapUI.jsx';
import LoginPage from './components/LoginPage.jsx';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';
import TestServer from './components/TestServer.jsx';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';

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