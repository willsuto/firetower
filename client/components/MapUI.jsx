import React, { useState, useEffect } from 'react';
import {APIProvider, Map } from '@vis.gl/react-google-maps';
import Home from './Home.jsx';
import Fire from './Fire.jsx';
import Neighbor from './Neighbor.jsx';
import getFires from '../../utilities/getFires.js'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userHomeSet, userLoggedOut } from '../reducers/userSlice.js';
import { firesFetched } from '../reducers/firesSlice.js';
import { neighborsReset, neighborsSet } from '../reducers/neighborsSlice.js';



const MapUI = () => {
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const [settingHomeLoc, setSettingHomeLoc] = useState(false);
  const { username, lat, lng, homeLocationSet } = useSelector(state => state.user)
  const fires = useSelector(state => state.fires);
  const neighbors = useSelector(state => state.neighbors);
  const [fireComponents, setFireComponents] = useState([]); 
  const [neighborComponents, setNeighborComponents] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  // //SSE Test DO I NEED DEPENDENCY ARRAY
  // useEffect(() => {
  //   const eventSource = new EventSource('api/events');

  //   eventSource.onmessage = (event) => {
  //     const parsedData = JSON.parse(event.data)
  //     console.log(parsedData)
  //   }

  //   eventSource.onerror = (error) => console.log('sse error', error);

  //   // return () => eventSource.close();
  // }, [])

  // useEffect(() => {
  //   const fetchNeighbors = async () => {
  //     try {
  //       const neighborsResponse = await fetch('/api/neighbors', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json', 
  //         },
  //         body: JSON.stringify({ username }) 
  //       });
  //       const neighbors = await neighborsResponse.json();
  //       dispatch(neighborsSet(neighbors));
  //     } catch (error) { console.log('Error fetching neighbors', error) };
  //   }
  //   if (username) fetchNeighbors();
  // }, []);

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

    dispatch(userLoggedOut());
    dispatch(neighborsReset());
    navigate('/');
  }

  const handleFiresClick = async (e) => {
    e.preventDefault();

    try {
      const getFiresResponse = await fetch('api/getFiresState');
      const fires = await getFiresResponse.json();
      dispatch(firesFetched(fires));
      setFireComponents(fires.map((fire, index) => <Fire key={index} fireObj={fire} />));
    } catch (error) { console.error('error in handlesFiresClick', error) }

  };

  const handleNeighborsClick = async (e) => {
    e.preventDefault();

    try {
      const neighborsResponse = await fetch('/api/neighbors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ username }) 
      });
      const neighbors = await neighborsResponse.json();
      
      dispatch(neighborsSet(neighbors));

      const neighborComponents = neighbors.map((neighbor, index) => {
        if (neighbor.home_lat && neighbor.home_long) {
          console.log('neighbor', neighbor)
          return <Neighbor key={index} name={neighbor.username} lat={neighbor.home_lat} lng={neighbor.home_long} message={neighbor.message}/>
        };  
      }); 
    
      setNeighborComponents(neighborComponents);

    } catch (error) { console.log('Error fetching neighbors', error) };
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className='controlPanel'>
        <button className='controlButton' onClick={() => setSettingHomeLoc(true)}>Home</button>
        <button className='controlButton' onClick={handleFiresClick}>Fires</button>
        <button className='controlButton' onClick= {handleNeighborsClick}>Neighbors</button>
        <button className='controlButton' onClick={handleLogout}>Log Out</button>
        <button className='controlButton'>Demo Fire</button>
      </div>
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
        {fireComponents && fireComponents.length > 0 && fireComponents}
        {neighborComponents && neighborComponents.length > 0 && neighborComponents}
      </Map>
    </APIProvider>
  )
}

export default MapUI;