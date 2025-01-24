import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    idToken: ''
  },
  reducers: {
    setUser: (state, action) => { 
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
