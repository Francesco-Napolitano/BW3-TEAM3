import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Col, Image, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import '../styles/CustomNavBar.css'
import { useState } from 'react'

export const CustomNavBar = () => {
  const [Rightcollapse, setRightcollapse] = useState(false)

  const myProfile = {
    image: 'https://via.placeholder.com/150',
    name: 'John',
    surname: 'Doe',
    title: 'Software Engineer',
  }

  return (
    <header className="myNavbar">
      <Navbar expand="sm">
        <Container>
          <Container>
            <Row className="innerNavbar">
              <Col xs={8} sm={3} lg={6} className="justify-content-start">
                <Navbar.Brand>
                  <NavLink to={'/Homepage'}>
                    <Image
                      src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                      alt="linkedin"
                      id="logoNavbar"
                    />
                  </NavLink>
                </Navbar.Brand>
                <Form>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </Form>
              </Col>
              <Col xs={4} sm={9} lg={6} className="justify-content-end">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="linkWrap">
                    <NavLink
                      to={'/Homepage'}
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                    >
                      <i className="bi bi-house-fill"></i>
                      <p className="d-none d-lg-block">Home</p>
                    </NavLink>
                    <NavLink
                      to={'/favourites'}
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                    >
                      <i className="bi bi-people-fill"></i>
                      <p className="d-none d-lg-block">Rete</p>
                    </NavLink>
                    <NavLink
                      to={'/jobs'}
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                    >
                      <i className="bi bi-briefcase-fill"></i>
                      <p className="d-none d-lg-block">Lavoro</p>
                    </NavLink>
                    <NavLink
                      to={'/'}
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                    >
                      <i className="bi bi-chat-dots-fill"></i>
                      <p className="d-none d-lg-block">Messaggistica</p>
                    </NavLink>
                    <NavLink
                      to={'/'}
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                    >
                      <i className="bi bi-bell-fill"></i>
                      <p className="d-none d-lg-block">Notifiche</p>
                    </NavLink>
                    <NavDropdown
                      title={
                        <div className="dropdown-title">
                          <Image src={myProfile?.image}></Image>
                          <p>Tu</p>
                        </div>
                      }
                      className={
                        'justify-content-center justify-content-lg-between'
                      }
                      onClick={() => {
                        setRightcollapse(false)
                      }}
                      id="basic-nav-dropdown"
                    >
                      <Row>
                        <Col xs={3} className="p-0">
                          <img src={myProfile?.image} alt="Foto dropdowns" />
                        </Col>
                        <Col xs={9}>
                          <div>
                            <p>
                              <b>
                                {myProfile?.name} {myProfile?.surname}
                              </b>
                            </p>
                            <p>{myProfile?.title}</p>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <NavDropdown.Item className="d-flex">
                            <Link to="/" className="btnWhite w-100 text-center">
                              Visualizza profilo
                            </Link>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                      <NavDropdown.Divider />
                      <Row>
                        <Col xs={12} className="my-1">
                          <p>
                            <b>Account</b>
                          </p>
                        </Col>
                        <Col xs={12}>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave text-muted">
                              🟨<b>Prova Premium gratis</b>
                            </p>
                          </NavDropdown.Item>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave text-muted">
                              Impostazioni e Privacy
                            </p>
                          </NavDropdown.Item>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave text-muted">Guida</p>
                          </NavDropdown.Item>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave text-muted">Lingua</p>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                      <NavDropdown.Divider />
                      <Row>
                        <Col xs={12} className="my-1">
                          <p>
                            <b>Gestisci</b>
                          </p>
                        </Col>
                        <Col xs={12}>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave text-muted">
                              Post e attività
                            </p>
                          </NavDropdown.Item>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave textCutter w-100 text-muted">
                              Account per la pubblicazione di off..
                            </p>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                      <NavDropdown.Divider />
                      <Row>
                        <Col xs={12}>
                          <NavDropdown.Item className="my-1">
                            <p className="linkBehave">Esci</p>
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                    </NavDropdown>
                    <Nav.Link
                      onClick={() => setRightcollapse(!Rightcollapse)}
                      id="aziendeToggle"
                      className="d-none d-md-flex justify-content-center"
                    >
                      <i className="bi bi-grid-3x3-gap-fill"></i>
                      <p>Per le aziende</p>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Col>
            </Row>
          </Container>
        </Container>
        {Rightcollapse ? (
          <div
            className="shadower"
            onClick={() => {
              setRightcollapse(!Rightcollapse)
            }}
          ></div>
        ) : (
          <></>
        )}
        {Rightcollapse ? (
          <div className="aziendeContent">
            <Container>
              <Row className="sticky-top">
                <h3> Per le aziende</h3>
              </Row>
              <Row className="aziendeMenu">
                <Col xs={12}>
                  <p>
                    <b>Scopri altri prodotti Linkedin</b>
                  </p>
                </Col>
                <hr className="my-2" />
                <Col xs={12}>
                  <Row className="list-unstyled firstMenu">
                    <Col xs={3}>
                      <i className="bi bi-play-btn-fill"></i>
                      <p>Learning</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-file-bar-graph-fill"></i>
                      <p> Insight</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-image"></i>
                      <p>Pubblica un&apos;offerta di lavoro</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-bullseye"></i>
                      <p>Pubblicizza</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-browser-safari"></i>
                      <p>Trova Lead</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-people-fill"></i>
                      <p> Gruppi</p>
                    </Col>
                    <Col xs={3}>
                      <i className="bi bi-person-fill-check"></i>
                      <p>Marketplace dei servizi</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="aziendeMenu">
                <Col xs={12}>
                  <p>
                    <b>Assistenza alle aziende di Linkedin</b>
                  </p>
                </Col>
                <hr className="my-2" />
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <p className="linkBehave">
                        <b> Talent solutions</b>
                        <br />
                        Trova, attrai e assumi
                      </p>
                    </Col>
                    <Col xs={12}>
                      <p className="linkBehave">
                        <b> Sales Solutions</b>
                        <br />
                        Sblocca nuove opportunità di vendita
                      </p>
                    </Col>
                    <Col xs={12}>
                      <p className="linkBehave">
                        <b>Pubblica offerta di lavoro gratuita</b>
                        <br />
                        Raggiungi i migliori candidati con la tua offerta di
                        lavoro
                      </p>
                    </Col>
                    <Col xs={12}>
                      <p className="linkBehave">
                        <b>Marketing Solutions</b>
                        <br />
                        Acquisisci clienti e fai crescere la tua azienda
                      </p>
                    </Col>
                    <Col xs={12}>
                      <p className="linkBehave">
                        <b>Learning Solutions</b>
                        <br />
                        Promuovi l&apos;acquisizione di competenze nella tua
                        organizzazione
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="aziendeMenu">
                <p>
                  <b>Crea una pagina aziendale</b>
                  <i className="bi bi-plus-lg fs-5 ms-2"></i>
                </p>
              </Row>
            </Container>
          </div>
        ) : (
          <div className="aziendeNoContent"></div>
        )}
      </Navbar>
    </header>
  )
}

export default CustomNavBar
