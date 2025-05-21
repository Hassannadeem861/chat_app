import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.jsx";
import messageReducer from "../redux/messageSlice.jsx";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // 👈 thunk ko manually mat add karo
});

export const persistor = persistStore(store);
