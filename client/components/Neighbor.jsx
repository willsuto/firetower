import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';


const Neighbor = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const user = useSelector(state => state.user)

  if (user.homeLocationSet) {
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfoWindowOpen(true)}
          position = {{lat: Number(user.lat), lng: Number(user.lng)}}
          title={'Home'}
        />
        {infoWindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={200}
            onCloseClick={() => setInfoWindowOpen(false)}>
            This is your home location.
          </InfoWindow>
        )}
      </>   
    )
  }
};

export default Home;