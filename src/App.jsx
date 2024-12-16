import SideBar from './sidebar/SideBar'
import CustomNavBar from './Components/CustomNavBar'
import './App.css'
import Footer from './components/Footer'
import MainProfilePage from './components/MainProfilePage'
import { Col, Container, Row } from 'react-bootstrap'

function App() {
  return (
    <>
      <CustomNavBar />
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
      <Footer />
    </>
  )
}

export default App
