import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import firesSlice from './reducers/firesSlice';

const store = configureStore(
  {
    reducer: { user: userSlice, fires: firesSlice }
  }
);

export default store;