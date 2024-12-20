// Importiamo createSlice da Redux Toolkit per creare il reducer e le actions
import { createSlice } from '@reduxjs/toolkit'

// Definiamo lo stato iniziale del profilo con campi vuoti
const initialState = {
  profileData: {
    name: '', // Nome utente
    title: '', // Titolo professionale
    area: '', // Area geografica
    bio: '', // Biografia
    image: '', // URL immagine profilo
    email: '', // Email utente
  },
  loading: false, // Flag per indicare se è in corso un'operazione
  error: null, // Eventuale messaggio di errore
}

// Creiamo lo slice del profilo con i suoi reducers
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Avvia l'aggiornamento del profilo
    updateProfileStart: (state) => {
      state.loading = true
      state.error = null
    },
    // Gestisce l'aggiornamento riuscito del profilo
    updateProfileSuccess: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload }
      state.loading = false
    },
    // Gestisce il fallimento dell'aggiornamento
    updateProfileFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // Imposta direttamente i dati del profilo
    setProfileData: (state, action) => {
      state.profileData = action.payload
    }
  }
})

// Esportiamo le action creators generate automaticamente
export const { 
  updateProfileStart, 
  updateProfileSuccess, 
  updateProfileFailure,
  setProfileData 
} = profileSlice.actions

// Esportiamo il reducer
export default profileSlice.reducer