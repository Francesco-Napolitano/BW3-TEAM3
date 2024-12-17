// Importiamo le funzioni necessarie da Redux Toolkit per creare slice e azioni asincrone
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Token di autenticazione per le chiamate API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'

// Azione asincrona per recuperare la lista delle esperienze di un utente
// Viene utilizzata nel componente MainProfilePage per caricare i dati iniziali
export const fetchExperiences = createAsyncThunk(
  'experiences/fetchExperiences',
  async (userId) => {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Errore nel recupero delle esperienze')
    }
    const data = await response.json()
    return data
  }
)

// Azione asincrona per aggiungere una nuova esperienza lavorativa
// Viene chiamata quando l'utente compila e invia il form nel modal di MainProfilePage
export const addExperience = createAsyncThunk(
  'experiences/addExperience',
  async ({ userId, experienceData }) => {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      }
    )
    if (!response.ok) {
      throw new Error('Errore nell\'aggiunta dell\'esperienza')
    }
    const data = await response.json()
    return data
  }
)

// Azione asincrona per eliminare un'esperienza lavorativa
// Viene utilizzata quando l'utente clicca sul pulsante di eliminazione in MainProfilePage
export const deleteExperience = createAsyncThunk(
  'experiences/deleteExperience',
  async ({ userId, expId }) => {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Errore nell\'eliminazione dell\'esperienza')
    }
    return expId
  }
)

// Creazione dello slice per gestire lo stato delle esperienze lavorative
// Questo reducer viene utilizzato nello store Redux e gestisce tutte le operazioni relative alle esperienze
const experiencesSlice = createSlice({
  name: 'experiences',
  initialState: {
    items: [], // Array delle esperienze
    status: 'idle', // Stato del caricamento
    error: null, // Eventuali errori
  },
  reducers: {},
  // Gestione delle azioni asincrone
  extraReducers: (builder) => {
    builder
      // Quando il caricamento delle esperienze è completato, aggiorna lo stato
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.items = action.payload
      })
      // Quando una nuova esperienza viene aggiunta con successo, la aggiunge all'array
      .addCase(addExperience.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Quando un'esperienza viene eliminata, la rimuove dall'array
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.items = state.items.filter((exp) => exp._id !== action.payload)
      })
  },
})

// Esportiamo il reducer per utilizzarlo nello store Redux
export default experiencesSlice.reducer
