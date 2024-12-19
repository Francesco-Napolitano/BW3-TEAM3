const initialState = {
  count: parseInt(sessionStorage.getItem('profileConnections')) || 0
}

const connectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONNECTION':
      const newCount = state.count + 1
      sessionStorage.setItem('profileConnections', newCount.toString())
      return {
        ...state,
        count: newCount
      }
    default:
      return state
  }
}

export default connectionsReducer 