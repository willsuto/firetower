import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getFires from '../../utilities/getFires';

const initialState = [];

const firesSlice = createSlice({
  name: 'fires',
  initialState,
  reducers: {

    firesFetched(state, action) {
      return action.payload;
    },

  
  }
})

export const { firesFetched } = firesSlice.actions;
export default firesSlice.reducer;