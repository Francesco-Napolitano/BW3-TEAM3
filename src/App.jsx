import SideBar from './Components/SideBar'
import CustomNavBar from './Components/CustomNavBar'
import './App.css'
import Footer from './components/Footer'
import MainProfilePage from './components/MainProfilePage'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import UsersProfilePage from './Components/UsersProfilePage'
import HomePage from './Components/Homepage'
import LeftSidebarHome from './components/LeftSidebarHome'

function App() {
  return (
    <>
      <CustomNavBar />
      <Routes>
        <Route
          path="/"
          // profile/me da aggiungere
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
        <Route
          path="/profile/:id"
          element={
            <Container>
              <Row className="mt-5">
                <Col xs={12} xl={9}>
                  <UsersProfilePage />
                </Col>
                <Col xs={3}>
                  <SideBar />
                </Col>
              </Row>
            </Container>
          }
        />
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
      <Footer />
    </>
  )
}

export default App
