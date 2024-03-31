import React, { useState, useEffect } from 'react';
import {APIProvider, Map } from '@vis.gl/react-google-maps';
import Home from './Home.jsx';
import Fire from './Fire.jsx';
import getFires from '../../utilities/getFires.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { homeSet } from '../reducers/homeSlice.js';

const MapUI = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const [fires, setFires] = useState([]);
  const [setHomeBoolean, setSetHomeBoolean] = useState(false);
  const homeLocation = useSelector(state => state.home)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // // on render, try to fetch fire data from FIRMS
  // useEffect(() => {
  //   const fetchFires = async () => {
  //     try {
  //       const firesArray = await getFires();
  //       setFires(firesArray);
  //     } catch (error) {
  //       console.error('Error in useEffect fetchFires:', error);
  //     }
  //   };
  //   fetchFires();
  // }, [])

  // // make an array of fire components
  // const fireComponents = fires.map((fire, index) => {
  //   return <Fire key={index} fireObj={fire} />
  // })

  // Set home location
  const handleSetHome = (e) => {
    // console.log(e)
    dispatch(homeSet({homeLocationSet: true, lat: e.detail.latLng.lat, lng: e.detail.latLng.lng}));
    setSetHomeBoolean(false);
  };

  

  return (
    <APIProvider apiKey={apiKey}>
      <button onClick={() => setSetHomeBoolean(true)}>Set Home</button>
      <button onClick={() => navigate('/')}>Log Out</button>
      <Map
        className='map'
        mapTypeId={'terrain'}
        defaultCenter={(homeLocation.lat && homeLocation.lng) ? homeLocation : {lat: 39.8283, lng: -98.5795}}
        defaultZoom={(homeLocation.lat && homeLocation.lng) ? 12 : 5}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId= {'d2d675d44012d45'}
        onClick={ handleSetHome }
      >
        <Home />
        {/* {fireComponents} */}
      </Map>
    </APIProvider>
  )
}

export default MapUI;