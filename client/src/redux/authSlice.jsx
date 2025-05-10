import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            // console.log("action.payload: ", action.payload);

            state.user = action.payload;
            state.token = action.payload.token;

        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    }
})

export const { setAuthUser, logout } = userSlice.actions;
export default userSlice.reducer;
