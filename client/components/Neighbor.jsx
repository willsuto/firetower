import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin
} from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';


const Neighbor = ({name, lat, lng, message}) => {
  // console.log(name, message)
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // subscribe to neighbor state to render changes
  // const currentNeighbor = useSelect(state => state.)

  
  return (
    <div >
      <AdvancedMarker ref={markerRef} onClick={() => setInfoWindowOpen(true)} title={name} position={{lat: Number(lat), lng: Number(lng)}}>
        <Pin background={'#22ccff'} borderColor={'#1e89a1'} glyphColor={'#0f677a'}/>
      </AdvancedMarker>
      {message && infoWindowOpen && (
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