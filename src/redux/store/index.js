// Importiamo combineReducers da Redux Toolkit per combinare i reducer
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// Importiamo i reducer per gestire le esperienze lavorative e la formazione
import experiencesReducer from '../reducers/experiencesReducer'
import educationReducer from '../reducers/educationReducer'
import selectedProfileReducer from '../reducers/selectedProfileReducer'
import { savedPost } from '../reducers/SavedPosts'
// Creiamo la combinazione dei reducer
const rootReducer = combineReducers({
  experiences: experiencesReducer,
  education: educationReducer,
  selectedProfile: selectedProfileReducer,
  savedPost: savedPost,
})

// Creiamo e configuriamo lo store Redux
export const store = configureStore({
  reducer: rootReducer,
})
