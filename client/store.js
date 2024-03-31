import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './reducers/homeSlice'

const store = configureStore(
  {
    reducer: { home: homeSlice }
  }
);

export default store;