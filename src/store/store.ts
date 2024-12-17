import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";


const store = configureStore({
  reducer: {
    auth: authReducer, // Aggiungiamo il reducer nel root reducer
    
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
