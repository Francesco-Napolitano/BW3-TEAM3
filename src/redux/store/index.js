// Importiamo le funzioni necessarie da Redux Toolkit e Redux Persist
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'

// Importiamo tutti i reducer della nostra applicazione
import experiencesReducer from '../reducers/experiencesReducer'
import educationReducer from '../reducers/educationReducer'
import selectedProfileReducer from '../reducers/selectedProfileReducer'
import savedPost from '../reducers/SavedPost'
import connectionsReducer from '../reducers/connectionsReducer'
import profileReducer from '../reducers/profileReducer'

// Configurazione per Redux Persist
// Specifica quali parti dello state devono essere persistenti
const persistConfig = {
  key: 'root', // Chiave radice per lo storage
  storage: sessionStorage, // Utilizziamo sessionStorage come storage
  whitelist: ['savedPost', 'profile'], // Lista dei reducer da persistere
}

// Combiniamo tutti i reducer in un unico reducer radice
const rootReducer = combineReducers({
  experiences: experiencesReducer,
  education: educationReducer,
  selectedProfile: selectedProfileReducer,
  savedPost: savedPost,
  connections: connectionsReducer,
  profile: profileReducer,
})

// Creiamo un reducer persistente usando la configurazione
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuriamo lo store Redux con il reducer persistente
export const store = configureStore({
  reducer: persistedReducer,
  // Configuriamo il middleware per disabilitare il controllo di serializzabilità
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Creiamo il persistor per gestire la persistenza dello state
export const persistor = persistStore(store)
