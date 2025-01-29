import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    idToken: '',
    localId: ''
  },
  reducers: {
    setUser: (state, action) => { 
      state.email = action.payload.email
      state.idToken = action.payload.idToken
      state.localId = action.payload.localId
    },
    deleteUser:(state) => {
      state.email = ''
      state.idToken = ''
      state.localId = ''
    }
  }
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
