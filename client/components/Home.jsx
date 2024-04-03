import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';
import { userMessageSet } from '../reducers/userSlice';

const Home = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { username, homeLocationSet, message, lat, lng } = useSelector(state => state.user);
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessageText(e.target.value); // Update message state with the new value from the event
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, message: messageText })
      });
      
      const messageSentBack = await response.json();
      
      console.log('messageSentBack', messageSentBack);

      dispatch(userMessageSet(messageSentBack))

    } catch (error) { console.error({'Error occurred during message put request': error}) };

    // setMessagePosted(true);
  }

  const handleDeleteClick = async (e) => {
    // delete post from database
    // remove post from state
    e.preventDefault();
    
    try {
      const response = await fetch('/api/deleteMessage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, message: message })
      });
      
      const messageSentBack = await response.json();
      
      // alert(messageSentBack);
      
      dispatch(userMessageSet(null))

    } catch (error) { console.error({'Error occurred during message put request': error}) };

  }

  if (homeLocationSet) {
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfoWindowOpen(true)}
          position={{ lat: Number(lat), lng: Number(lng) }}
          title={'Home'}
        />
        {infoWindowOpen && !message && (
          <InfoWindow
            anchor={marker}
            maxWidth={'auto'}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
          <form onSubmit={handleSubmit}>
            <label>Message:
              <input type="text" value={messageText} onChange={handleMessageChange}/>
            </label>
          </form>
          </InfoWindow>
        )}
        {message && (
          <InfoWindow
          anchor={marker}
          maxWidth={'auto'}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
         {message}
         <button onClick={handleDeleteClick}>Delete</button>
        </InfoWindow>
        )
        }
      </>
    )
  }
};

export default Home;
