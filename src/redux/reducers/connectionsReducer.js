const initialState = {
  count: parseInt(sessionStorage.getItem('profileConnections')) || 0
}

const connectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONNECTION':
      const newCount = state.count + 1
      sessionStorage.setItem('profileConnections', newCount.toString())
      
      // Aggiorna anche le statistiche del profilo
      const currentStats = JSON.parse(sessionStorage.getItem('profileStats') || '{}')
      const updatedStats = {
        ...currentStats,
        connections: newCount
      }
      sessionStorage.setItem('profileStats', JSON.stringify(updatedStats))
      
      return {
        ...state,
        count: newCount
      }
    default:
      return state
  }
}

export default connectionsReducer 