import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: true, // Abilita esplicitamente `redux-thunk` (se preferisci configurarlo manualmente)
    }), // Usa getDefaultMiddleware senza aggiungere `redux-thunk` esplicitamente
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
