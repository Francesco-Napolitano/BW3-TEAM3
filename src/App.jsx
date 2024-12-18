// Importazione dei componenti necessari
import SideBar from './Components/SideBar'
import CustomNavBar from './Components/CustomNavBar'
import './App.css'
import Footer from './components/Footer'
import MainProfilePage from './Components/MainProfilePage'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes, useParams } from 'react-router-dom'
import UsersProfilePage from './Components/UsersProfilePage'
import HomePage from './Components/Homepage'
import LeftSidebarHome from './Components/LeftSidebarHome'

// Componente wrapper per gestire il parametro id dall'URL e passarlo a UsersProfilePage
function ProfileWrapper() {
  const { id } = useParams()
  return <UsersProfilePage selectedUserId={id} />
}

// Componente principale dell'applicazione
function App() {
  return (
    <>
      {/* Navbar sempre visibile in tutte le pagine */}
      <CustomNavBar />

      {/* Configurazione delle rotte dell'applicazione */}
      <Routes>
        {/* Rotta principale - Profilo personale */}
        <Route
          path="/"
          element={
            <Container>
              <Row className="mt-5">
                <Col xs={12} xl={9}>
                  <MainProfilePage />
                </Col>
                <Col xs={3}>
                  <SideBar />
                </Col>
              </Row>
            </Container>
          }
        />

        {/* Rotta per visualizzare il profilo di altri utenti */}
        <Route
          path="/profile/:id"
          element={
            <Container>
              <Row className="mt-5">
                <Col xs={12} xl={9}>
                  <ProfileWrapper />
                </Col>
                <Col xs={3}>
                  <SideBar />
                </Col>
              </Row>
            </Container>
          }
        />

        {/* Rotta per la homepage con layout a tre colonne */}
        <Route
          path="/homepage"
          element={
            <Container>
              <Row className="mt-5 ">
                <Col lg={3}>
                  <LeftSidebarHome />
                </Col>
                <Col xs={12} lg={6}>
                  <HomePage />
                </Col>
                <Col lg={3}>
                  <SideBar />
                </Col>
              </Row>
            </Container>
          }
        />
      </Routes>

      {/* Footer sempre visibile in tutte le pagine */}
      <Footer />
    </>
  )
}

export default App
