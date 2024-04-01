import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  lat: null,
  lng: null,
  homeLocationSet: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    userSet(state, action) {
      const {username, home_lat, home_long, home_location_set} = action.payload;
      console.log(username, home_lat, home_long, home_location_set)
      state.username = username;
      state.lat = home_lat;
      state.lng = home_long;
      state.homeLocationSet = home_location_set;
    },

    userHomeSet(state, action) {
      const {lat, lng} = action.payload;
      state.lat = lat;
      state.lng = lng;
      state.homeLocationSet = true;
    }
  }
})

export const { userSet, userHomeSet } = userSlice.actions;
export default userSlice.reducer;