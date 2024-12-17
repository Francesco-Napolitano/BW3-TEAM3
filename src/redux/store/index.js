import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profile.Reducer";
import imageReducer from "../reducers/image.Reducer";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    image: imageReducer,
  },
});

export default store;

// Tipi di stato e dispatch non necessari in JavaScript
