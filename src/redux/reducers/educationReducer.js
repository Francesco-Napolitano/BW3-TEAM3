// Importiamo le funzioni necessarie da Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Token di autenticazione per le chiamate API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'

// Azione asincrona per recuperare la lista delle formazioni di un utente
// Viene utilizzata nel componente MainProfilePage per caricare i dati iniziali
export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async (userId) => {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/education`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    return data
  }
)

// Azione asincrona per aggiungere una nuova formazione
// Viene chiamata quando l'utente compila e invia il form nel modal di MainProfilePage
export const addEducation = createAsyncThunk(
  'education/addEducation',
  async ({ userId, educationData }) => {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/education`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationData),
      }
    )
    const data = await response.json()
    return data
  }
)

// Azione asincrona per eliminare una formazione
// Viene utilizzata quando l'utente clicca sul pulsante di eliminazione in MainProfilePage
export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
  async ({ userId, eduId }) => {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/education/${eduId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return eduId
  }
)

// Creazione dello slice per gestire lo stato delle formazioni
// Questo reducer viene utilizzato nello store Redux e gestisce tutte le operazioni relative alla formazione
const educationSlice = createSlice({
  name: 'education',
  initialState: {
    items: [], // Array delle formazioni
    status: 'idle', // Stato del caricamento
    error: null, // Eventuali errori
  },
  reducers: {},
  // Gestione delle azioni asincrone
  extraReducers: (builder) => {
    builder
      // Quando il caricamento delle formazioni è completato, aggiorna lo stato
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.items = action.payload
      })
      // Quando una nuova formazione viene aggiunta con successo, la aggiunge all'array
      .addCase(addEducation.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Quando una formazione viene eliminata, la rimuove dall'array
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.items = state.items.filter((edu) => edu._id !== action.payload)
      })
  },
})

// Esportiamo il reducer per utilizzarlo nello store Redux
export default educationSlice.reducer
