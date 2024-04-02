import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import firesSlice from './reducers/firesSlice';
import neighborsSlice from './reducers/neighborsSlice';

const store = configureStore(
  {
    reducer: { user: userSlice, fires: firesSlice, neighbors: neighborsSlice }
  }
);

export default store;