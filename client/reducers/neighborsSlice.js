import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const neighborsSlice = createSlice({
  name: 'neighbors',
  initialState,
  reducers: {

    neighborsSet(state, action) {
      // console.log('action payload', action.payload);
      return action.payload;
    },
    
  }
})

export const { neighborsSet } = neighborsSlice.actions;
export default neighborsSlice.reducer;