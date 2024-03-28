import React from 'react';
import MapUI from './components/MapUI.jsx';
import GetFires from './components/GetFires.jsx';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';

const App = () => {
  
  return (
    <>
      <GetFires />
      <MapUI />
    </>
  );
};

export default App;