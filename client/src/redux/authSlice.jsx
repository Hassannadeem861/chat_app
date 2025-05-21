import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setUsers: (state, action) => {
      state.users = action?.payload?.users || []      
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuthUser, logout, setUsers } = userSlice.actions;
export default userSlice.reducer;
