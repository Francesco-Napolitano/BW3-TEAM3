// Importazione delle dipendenze necessarie
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockExperiences, mockEducation, getRandomNumber, getRandomItems } from './mockDdata'

// Funzione helper per ottenere o generare dati utente
// Controlla se esistono dati in sessionStorage, altrimenti genera nuovi dati casuali
const getUserData = (userId) => {
  const storageKey = `userData_${userId}`
  const storedData = sessionStorage.getItem(storageKey)
  
  if (storedData) {
    return JSON.parse(storedData)
  }

  // Genera nuovi dati casuali usando le funzioni helper importate
  const newData = {
    experiences: getRandomItems(mockExperiences, getRandomNumber(1, 3)),
    education: getRandomItems(mockEducation, getRandomNumber(1, 3))
  }

  // Salva i dati generati in sessionStorage per uso futuro
  sessionStorage.setItem(storageKey, JSON.stringify(newData))
  return newData
}

// Thunk asincrono per recuperare i dati del profilo
export const fetchSelectedProfile = createAsyncThunk(
  'selectedProfile/fetchProfile',
  async (userId) => {
    // Token di autenticazione per le API
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'
    
    // Chiamata API per ottenere i dati del profilo
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Errore nel caricamento del profilo')
    }
    const profileData = await response.json()
    
    // Recupera o genera dati mock aggiuntivi
    const userData = getUserData(userId)
    
    // Unisce i dati API con i dati mock, usando i dati mock solo se mancano dati reali
    return {
      ...profileData,
      experiences: profileData.experiences?.length > 0 ? profileData.experiences : userData.experiences,
      education: profileData.education?.length > 0 ? profileData.education : userData.education
    }
  }
)

// Definizione dello slice per gestire lo stato del profilo selezionato
const selectedProfileSlice = createSlice({
  name: 'selectedProfile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null
  },
  reducers: {
    // Action per resettare lo stato del profilo
    clearSelectedProfile: (state) => {
      state.profile = null
      state.status = 'idle'
      state.error = null
    }
  },
  // Gestione degli stati della chiamata asincrona
  extraReducers: (builder) => {
    builder
      // Gestione stato di caricamento
      .addCase(fetchSelectedProfile.pending, (state) => {
        state.status = 'loading'
      })
      // Gestione successo della chiamata
      .addCase(fetchSelectedProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      // Gestione errori
      .addCase(fetchSelectedProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { clearSelectedProfile } = selectedProfileSlice.actions
export default selectedProfileSlice.reducer
