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
      const {user, lat, lng} = action.payload;
      state.name = name;
      state.lat = lat;
      state.lng = lng;
      state[user].homeLocationSet = false;
    },

    userHomeSet(state, action) {
      const {user, lat, lng} = action.payload;
      state[user].lat = lat;
      state[user].lng = lng;
      state[user].homeLocationSet = true;
    }
  }
})

export const { userSet, userHomeSet } = userSlice.actions;
export default userSlice.reducer;