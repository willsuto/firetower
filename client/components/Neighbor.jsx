import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';


const Neighbor = ({name, lat, lng, message}) => {
  console.log('lat prop', lat, 'lng prop', lng)
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  
  return (
    <div >
      <AdvancedMarker ref={markerRef} title={name} position={{lat: Number(lat), lng: Number(lng)}}>
        <Pin background={'#22ccff'} borderColor={'#1e89a1'} glyphColor={'#0f677a'}/>
      </AdvancedMarker>
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfoWindowOpen(false)}>
          {message}
        </InfoWindow>
      )}
    </div>   
  )
};

export default Neighbor;