import React from 'react';
import MapUI from './components/MapUI.jsx';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';
import TestServer from './components/TestServer.jsx'

const App = () => {
  
  return (
    <>
      <TestServer />
      <MapUI />
    </>
  );
};

export default App;