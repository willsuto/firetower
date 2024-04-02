import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import fireIcon from '../images/fireIcon40x40.png'


const Fire = ({fireObj}) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  
  return (
    <>
      <AdvancedMarker
        ref = {markerRef}
        onClick = {() => setInfoWindowOpen(true)}
        position = {{lat: Number(fireObj.latitude), lng: Number(fireObj.longitude)}}
        title = {'Fire'}>
        <div style={{ position: 'relative' }}>
            {/* Centered image element */}
            <img
              src={fireIcon}
              alt="Fire"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                // maxWidth: '50px', 
                // maxHeight: '50px',
              }}
            />
          </div>
        </AdvancedMarker>
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfoWindowOpen(false)}>
          This is a fire.
        </InfoWindow>
      )}
    </>   
  )
};

export default Fire;