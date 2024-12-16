import { Col, Container, Row } from 'react-bootstrap'
import '../styles/MainProfilePage.css'
// import { useEffect, useState } from 'react'

const MainProfilePage = () => {
  //  const [people, setPeople] = useState([])
  //  const token =
  //    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMjkwODBlYTI4NjAwMTUyOGI5NjQiLCJpYXQiOjE3MzQzNTUyMDgsImV4cCI6MTczNTU2NDgwOH0.Kiezr-4hqQSFoAvHoyI-ZE5q4xPsYty78JJKTFZw9UY'
  //  const getPeople = () => {
  //    return fetch('https://striveschool-api.herokuapp.com/api/profile/ ', {
  //      headers: {
  //        Authorization: `Bearer ${token}`,
  //      },
  //    })
  //      .then((response) => {
  //        if (response.ok) {
  //          return response.json()
  //        } else {
  //          throw new Error()
  //        }
  //      })
  //      .then((data) => setPeople(data))
  //      .catch((error) => console.log('Oh no...', error))
  //  }

  //  useEffect(() => {
  //    getPeople()
  //  }, [])

  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        <Col>
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Informazioni</h2>
            <p id="firstP" className="m-0 ">
              Ciao! Mi chiamo ------ e sono un ----- con base a -----. La mia
              carriera è iniziata come ------, e oggi sono orgoglioso di
              collaborare con clienti e team per sviluppare soluzioni web
              end-to-end, con competenze che spaziano dalla progettazione
              front-end allo sviluppo back-end. <br /> <br /> Nel corso degli
              anni ho acquisito esperienza lavorando su progetti di diverse
              dimensioni, dal piccolo sito web personale a piattaforme complesse
              per grandi aziende. Sono anche appassionato di mentoring: mi piace
              condividere conoscenze con colleghi e aspiranti sviluppatori per
              aiutarli a crescere nel settore IT.
              <br /> <br />
              Se vuoi metterti in contatto con me, scrivimi pure a ----- o
              connettiti su LinkedIn per discutere di nuove opportunità o
              collaborazioni! Grazie per aver visitato il mio profilo, e spero
              di sentirti presto!
            </p>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Analisi</h2>

            <div>
              <i className="bi bi-people-fill me-3"></i>
              <span>----- visite al profilo</span>
            </div>
            <div>
              <i className="bi bi-people-fill me-3"></i>
              <span>----- impressioni del post</span>
            </div>
            <div>
              <i className="bi bi-people-fill me-3"></i>
              <span>----- ricerche del profilo</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Formazione</h2>
            <div className="d-flex gap-3 justify-content-center">
              <img
                id="images-schools"
                src="https://yt3.googleusercontent.com/9RGAVa52qAdJfJSShxr9prs7EUpia4tsVsnvrb-E1Yhdj7H4LMU4gHLRDC-7tJLV9BVYaEq6M7g=s900-c-k-c0x00ffffff-no-rj"
                alt="epicode logo"
              />
              <div>
                <p className="m-0">Epicode</p>
                <p className="m-0">2024-2025</p>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column"></div>
        </Col>
      </Row>
    </Container>
  )
}

export default MainProfilePage
