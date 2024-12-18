// Importiamo configureStore da Redux Toolkit per creare lo store Redux
import { configureStore } from '@reduxjs/toolkit'
// Importiamo i reducer per gestire le esperienze lavorative e la formazione
import experiencesReducer from '../reducers/experiencesReducer'
import educationReducer from '../reducers/educationReducer'
import selectedProfileReducer from '../reducers/selectedProfileReducer'

// Creiamo e configuriamo lo store Redux
// Questo store viene utilizzato nel componente MainProfilePage per:
// - Gestire le esperienze lavorative (aggiunta, eliminazione, visualizzazione)
// - Gestire la formazione (aggiunta, eliminazione, visualizzazione)
export const store = configureStore({
  reducer: {
    // Il reducer delle esperienze gestisce l'array delle esperienze lavorative
    experiences: experiencesReducer,
    // Il reducer dell'educazione gestisce l'array della formazione
    education: educationReducer,
    selectedProfile: selectedProfileReducer,
  },
})

