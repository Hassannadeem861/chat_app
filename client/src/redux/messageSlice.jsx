import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: null
}

const messageSlice = createSlice({

    name: 'message',
    initialState,

    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer;