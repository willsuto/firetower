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

    neighborsReset(state, action) {
      return initialState;
    }
    
  }
})

export const { neighborsSet, neighborsReset } = neighborsSlice.actions;
export default neighborsSlice.reducer;