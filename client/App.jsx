import React from 'react';
// import MapUI from './components/MapUI.jsx';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';

const App = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  return (
    <>
      <h1>hello world</h1>
      {/* <MapUI /> */}
    </>
  );
};

export default App;