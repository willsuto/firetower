import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const homeLocation = useSelector(state => state.home)

  if (homeLocation.homeLocationSet) {
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfoWindowOpen(true)}
          position = {{lat: homeLocation.lat, lng: homeLocation.lng}}
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