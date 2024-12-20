const initialState = {
  name: 'Francesco',
  profileImg:
    'https://www.dovedormire.info/wp-content/uploads/sites/119/torino.jpg',
  lingue: ['Italiano', 'Inglese'],
}

const profileNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      }

    case 'NUOVA_LINGUA':
      return {
        ...state,
        lingue: [...state.lingue, action.payload],
      }

    case 'RIMUOVI_LINGUA':
      return {
        ...state,
        lingue: state.lingue.filter((lingua) => lingua !== action.payload),
      }

    default:
      return state
  }
}

export default profileNameReducer
