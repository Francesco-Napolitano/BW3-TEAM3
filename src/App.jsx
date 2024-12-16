import SideBar from './sidebar/SideBar'
import CustomNavBar from './Components/CustomNavBar'
import './App.css'
import Footer from './components/Footer'
import MainProfilePage from './components/MainProfilePage'

function App() {
  return (
    <>
      <div>
        <CustomNavBar />
        <MainProfilePage />
        <div className="d-flex justify-content-end">
          <SideBar />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
