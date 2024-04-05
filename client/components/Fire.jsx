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
          <h5>Satellite: {fireObj.satellite}</h5>
          <h5>Instrument: {fireObj.instrument}</h5>
          <h5>Confidence: {fireObj.confidence}</h5>
          <h5>Brightness: {fireObj.bright_ti5}</h5>
          <h5>Day/Night: {fireObj.satellite}</h5>
          <h5>Date: {fireObj.acq_date}</h5>
          <h5>Time: {fireObj.acq_time}</h5>
          
        
        </InfoWindow>
      )}
    </>   
  )
};

export default Fire;