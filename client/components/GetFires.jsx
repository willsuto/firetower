import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import fireIcon from '../images/fireIcon40x40.png';
import getFires from '../../utilities/getFires.js';

const GetFires = () => {

  const handleClick = async () => {
    console.log(await getFires())
  }

  return (
    <>
      <button onClick={handleClick}>get fires</button>
    </>
  );
};

// const GetFires = () => {
//   const [infoWindowOpen, setInfoWindowOpen] = useState(false);
//   const [markerRef, marker] = useAdvancedMarkerRef();
//   const [fires, setFires] = useState();

//   const fireComponents = fires.map(fire => {
//     return <
//   });

//   return (
//     <>
//       <AdvancedMarker
//         ref = {markerRef}
//         onClick = {() => setInfoWindowOpen(true)}
//         position = {{lat: 32.6, lng: -116.6}}
//         title = {'Fire'}>
//         <div style={{ position: 'relative' }}>
//             {/* Centered image element */}
//             <img
//               src={fireIcon}
//               alt="Fire"
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 maxWidth: '50px', // Adjust size as needed
//                 maxHeight: '50px',
//               }}
//             />
//           </div>
//         </AdvancedMarker>
//       {infoWindowOpen && (
//         <InfoWindow
//           anchor={marker}
//           maxWidth={200}
//           onCloseClick={() => setInfoWindowOpen(false)}>
//           This is a fire.
//         </InfoWindow>
//       )}
//     </>   
//   )
// };

export default GetFires;