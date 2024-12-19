const initialState = {
  list: [],
}

const savedPost = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_POST': // Verifica se il post esiste già
    {
      const postExists = state.list.some(
        (post) => post._id === action.payload._id
      )
      if (postExists) {
        // Se esiste, rimuovilo
        return {
          ...state,
          list: state.list.filter((post) => post._id !== action.payload._id),
        }
      }
      // Se non esiste, aggiungilo
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    }
    default:
      return state
  }
}

export default savedPost
