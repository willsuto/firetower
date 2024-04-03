import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const user = useSelector(state => state.user);
  const [message, setMessage] = useState('');
  const currentUser = useSelector(state => state.user);

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value); // Update message state with the new value from the event
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: currentUser.username, message: message })
      });
      
      const alertMessage = await response.json();
      alert(alertMessage)
      // const message = await response.json();
      // if (message === 'User already exists') alert('User already exists')
      // else alert(message);

    } catch (error) { console.error({'Error occurred during message put request': error}) };

  }

  if (user.homeLocationSet) {
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfoWindowOpen(true)}
          position={{ lat: Number(user.lat), lng: Number(user.lng) }}
          title={'Home'}
        />
        {infoWindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={'auto'}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
          <form onSubmit={handleSubmit}>
            <label>Message:
              <input type="text" value={message} onChange={handleMessageChange}/>
            </label>
          </form>
          </InfoWindow>
        )}
      </>
    )
  }
};

export default Home;


{/* <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div> */}