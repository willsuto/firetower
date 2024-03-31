import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  homeLocationSet: false,
  lat: null, 
  lng: null
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {

    homeSet(state, action) {
      const location = action.payload;
      state.homeLocationSet = location.homeLocationSet;
      state.lat = location.lat;
      state.lng = location.lng;
    }

  }

})

export const { homeSet } = homeSlice.actions;
export default homeSlice.reducer;