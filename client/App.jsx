import React from 'react';
import MapUI from './components/MapUI.jsx';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';

const App = () => {
  
  return (
    <>
      <MapUI />
    </>
  );
};

export default App;