import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getFires from '../../utilities/getFires';

const initialState = [];

const firesSlice = createSlice({
  name: 'fires',
  initialState,
  reducers: {

    firesFetched(state, action) {
      const fires = action.payload;
      console.log('state', state)
      state = [...state, ...fires];
    },

  
  }
})

export const { firesFetched } = firesSlice.actions;
export default firesSlice.reducer;