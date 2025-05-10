import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../redux/authSlice.jsx"


const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer
    }
})

export default store;