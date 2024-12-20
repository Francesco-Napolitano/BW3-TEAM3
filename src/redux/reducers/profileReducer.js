// Importiamo createSlice da Redux Toolkit per creare il reducer e le actions
import { createSlice } from '@reduxjs/toolkit'

// Definiamo lo stato iniziale del profilo con campi vuoti
const initialState = {
  profileData: null,
  stats: (() => {
    const savedStats = sessionStorage.getItem('profileStats')
    if (savedStats) {
      return JSON.parse(savedStats)
    }
    const newStats = {
      visits: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 1000) + 200,
      searches: Math.floor(Math.random() * 100) + 20,
      connections: parseInt(sessionStorage.getItem('profileConnections')) || 0
    }
    sessionStorage.setItem('profileStats', JSON.stringify(newStats))
    return newStats
  })(),
  loading: false,
  error: null
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
    },
    // Aggiorna le statistiche del profilo
    updateProfileStats: (state, action) => {
      state.stats = {
        ...state.stats,
        ...action.payload
      }
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