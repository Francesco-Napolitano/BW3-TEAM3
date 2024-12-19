const initialState = {
  list: [],
}

const savedPost = (state = initialState, action) => {
  console.log("Questa è un'action", action)
  switch (action.type) {
    case 'SAVE_POST':
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    default:
      return state
  }
}

export default savedPost
