const initialState = {
  list: [],
}

export const savedPost = (state = initialState, action) => {
  switch (UserActivation.type) {
    case 'SAVE_POST':
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
