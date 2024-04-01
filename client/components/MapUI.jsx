import React, { useState, useEffect } from 'react';
import {APIProvider, Map } from '@vis.gl/react-google-maps';
import Home from './Home.jsx';
import Fire from './Fire.jsx';
import getFires from '../../utilities/getFires.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userHomeSet } from '../reducers/userSlice.js';


const MapUI = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const [fires, setFires] = useState([]);
  const [settingHomeLoc, setSettingHomeLoc] = useState(false);
  const { username, lat, lng, homeLocationSet } = useSelector(state => state.user)

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
  // const handleSetHome = (e) => {
  //   // console.log(e)
  //   dispatch(homeSet({homeLocationSet: true, lat: e.detail.latLng.lat, lng: e.detail.latLng.lng}));
  //   setSetHomeBoolean(false);
  // };

  const handleClick = (e) => {
    if (settingHomeLoc) {
      const locationObj = { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng }
      dispatch(userHomeSet(locationObj)) 
    }
    setSettingHomeLoc(false);
  } 

  const handleLogout = async (e) => {
    e.preventDefault;

    try {
      fetch('api/logout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: lat, lng: lng, homeLocationSet: homeLocationSet, username: username })
      }) 
    } catch (error) {console.error({'Error occurred during logout': error})}

    navigate('/');
  }

  

  return (
    <APIProvider apiKey={apiKey}>
      <button onClick={() => setSettingHomeLoc(true)}>Set Home</button>
      <button onClick={handleLogout}>Log Out</button>
      <Map
        className='map'
        mapTypeId={'terrain'}
        defaultCenter={(lat && lng) ? {lat: Number(lat), lng: Number(lng)} : {lat: 39.8283, lng: -98.5795}}
        defaultZoom={(lat && lng) ? 15 : 5}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId= {'d2d675d44012d45'}
        onClick={ handleClick }
      >
        <Home />
        {/* {fireComponents} */}
      </Map>
    </APIProvider>
  )
}

export default MapUI;