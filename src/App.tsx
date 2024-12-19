import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './components/Login'
import CustomNavBar from './Components/CustomNavBar'

const App: React.FC = () => (
  <Provider store={store}>
    <CustomNavBar />
    <Login />
  </Provider>
)

export default App
