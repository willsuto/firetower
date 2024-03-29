import React, { useState, useEffect } from 'react';
import {APIProvider,Map, Marker} from '@vis.gl/react-google-maps';
import Home from './Home.jsx';
import Fire from './Fire.jsx';
import getFires from '../../utilities/getFires.js'

const MapUI = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const [fires, setFires] = useState([]);

  
  useEffect(() => {
    const fetchFires = async () => {
      try {
        const firesArray = await getFires();
        setFires(firesArray);
      } catch (error) {
        console.error('Error in useEffect fetchFires:', error);
      }
    };
    fetchFires();
  }, [])
  
  // console.log('fires', fires)

  const fireComponents = fires.map((fire, index) => {
    return <Fire key={index} fireObj={fire} />
  })

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
        {fireComponents}
      </Map>
    </APIProvider>
  )
}

export default MapUI;