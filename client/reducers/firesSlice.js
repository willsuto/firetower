import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


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