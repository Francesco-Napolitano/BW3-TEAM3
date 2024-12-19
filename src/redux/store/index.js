import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import experiencesReducer from '../reducers/experiencesReducer'
import educationReducer from '../reducers/educationReducer'
import selectedProfileReducer from '../reducers/selectedProfileReducer'
import savedPost from '../reducers/SavedPost'
import connectionsReducer from '../reducers/connectionsReducer'

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['savedPost'], // salva solo savedPost nel session storage
}

const rootReducer = combineReducers({
  experiences: experiencesReducer,
  education: educationReducer,
  selectedProfile: selectedProfileReducer,
  savedPost: savedPost,
  connections: connectionsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
