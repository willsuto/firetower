import React from 'react';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';
import Home from './Home.jsx';
import Fire from './Fire.jsx';

const MapUI = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        className='map'
        mapTypeId={'terrain'}
        defaultCenter={{lat: 32.7, lng: -116.5}}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId= {'d2d675d44012d45'}
      >
        <Home />
        <Fire />
      </Map>
    </APIProvider>
  )
}

export default MapUI;