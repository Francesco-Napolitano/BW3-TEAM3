import { Col, Container, Row } from 'react-bootstrap'
import '../styles/MainProfilePage.css'
import { useEffect, useState } from 'react'

const MainProfilePage = () => {
  const [people, setPeople] = useState([])
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMjkwODBlYTI4NjAwMTUyOGI5NjQiLCJpYXQiOjE3MzQzNTUyMDgsImV4cCI6MTczNTU2NDgwOH0.Kiezr-4hqQSFoAvHoyI-ZE5q4xPsYty78JJKTFZw9UY'
  const getPeople = () => {
    return fetch(
      'https://striveschool-api.herokuapp.com/api/profile/65536da3dd99ef0019a09358',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error()
        }
      })
      .then((data) => {
        console.log(data)
        setPeople(data)
      })
      .catch((error) => console.log('Oh no...', error))
  }

  useEffect(() => {
    getPeople()
  }, [])

  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Informazioni</h2>
            <p className="m-0 ">
              Ciao! Mi chiamo{' '}
              <span
                className="
            fst-italic"
              >
                {people.name}
              </span>
              , sono{' '}
              <span className="fst-italic">
                {people.title === '' ? 'Web Developer' : people.title}{' '}
              </span>
              e vivo a <span className="fst-italic">{' ' + people.area} </span>.
              La mia carriera è iniziata come freelancer, e oggi sono orgoglioso
              di collaborare con clienti e team per sviluppare soluzioni web
              end-to-end, con competenze che spaziano dalla progettazione
              front-end allo sviluppo back-end. <br /> <br /> Nel corso degli
              anni ho acquisito esperienza lavorando su progetti di diverse
              dimensioni, dal piccolo sito web personale a piattaforme complesse
              per grandi aziende. Sono anche appassionato di mentoring: mi piace
              condividere conoscenze con colleghi e aspiranti sviluppatori per
              aiutarli a crescere nel settore IT.
              <br /> <br />
              Se vuoi metterti in contatto con me, scrivimi pure a{' '}
              <span
                className="
            fst-italic"
              >
                {people.email}
              </span>{' '}
              o connettiti su LinkedIn per discutere di nuove opportunità o
              collaborazioni! Grazie per aver visitato il mio profilo, e spero
              di sentirti presto!
            </p>
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <Row className="text-start">
            <h2 className="d-flex">Analisi</h2>
            <Col xs={12} lg={4}>
              <i className="bi bi-people-fill me-3 fs-3"></i>
              <span className="">----- visite al profilo</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-bar-chart-fill me-3 fs-3"></i>
              <span className="">----- impressioni del post</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-search me-3 fs-3"></i>
              <span className="">----- ricerche del profilo</span>
            </Col>
          </Row>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Formazione</h2>
            <div className="d-flex gap-3 justify-content-center">
              <img
                className="images-schools"
                src="https://yt3.googleusercontent.com/9RGAVa52qAdJfJSShxr9prs7EUpia4tsVsnvrb-E1Yhdj7H4LMU4gHLRDC-7tJLV9BVYaEq6M7g=s900-c-k-c0x00ffffff-no-rj"
                alt="epicode logo"
              />
              <div>
                <p className="m-0 fw-bold">Epicode</p>
                <p className="m-0">
                  {people.createdAt.slice(0, 4)}/{people.updatedAt.slice(0, 4)}
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Lingue</h2>
            <p className="m-0">Italiano</p>
            <p className="m-0">Inglese</p>
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start gap-3">
            <h2 className="m-0">Interessi</h2>
            <div className="d-flex gap-3 ">
              <img
                className="interests-img rounded-circle"
                src="https://images.tagesschau.de/image/02ab5f2b-f1f3-43b2-876f-17348143996a/AAABkBO_bVE/AAABkZLoaiw/1x1-840/elon-musk-206.jpg"
                alt="elon musk picture"
              />
              <div>
                <p className="m-0">
                  Elon Musk <i className="bi bi-linkedin text-primary"></i>
                </p>
                <p className="m-0 interests-writes text-secondary">
                  Fondaotre di Tesla e SpaceX e PayPal
                </p>
                <i
                  className="bi bi-heart mb-3"
                  onClick={(e) => {
                    e.target.classList.toggle('bi-heart-fill')
                    e.target.classList.toggle('bi-heart')
                  }}
                ></i>
              </div>
            </div>
            <div className="d-flex gap-3">
              <img
                className="interests-img rounded-circle"
                src="https://fba.help/wp-content/uploads/2019/05/Jeff-Bezos.jpg"
                alt="jeff bezos picture"
              />
              <div>
                <p className="m-0">
                  Jeff Bezos <i className="bi bi-linkedin text-primary"></i>
                </p>
                <p className="m-0 interests-writes text-secondary">
                  Founder of Amazon and Blue Origin
                </p>
                <i
                  className="bi bi-heart mb-3"
                  onClick={(e) => {
                    e.target.classList.toggle('bi-heart-fill')
                    e.target.classList.toggle('bi-heart')
                  }}
                ></i>
              </div>
            </div>
            <div className="d-flex gap-3">
              <img
                className="interests-img rounded-circle"
                src="https://futuranetwork.eu/public/oltreil2030/images/Immagini_news/Zuckerberg_2_.JPG"
                alt="mark zuckerberg picture"
              />
              <div>
                <p className="m-0">
                  Mark Zuckerberg{' '}
                  <i className="bi bi-linkedin text-primary"></i>
                </p>
                <p className="m-0 interests-writes text-secondary">
                  Co-founder and CEO di Meta
                </p>
                <i
                  className="bi bi-heart mb-3"
                  onClick={(e) => {
                    e.target.classList.toggle('bi-heart-fill')
                    e.target.classList.toggle('bi-heart')
                  }}
                ></i>
              </div>
            </div>
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Argomenti di interesse</h2>
            <p className="m-0">
              Sviluppo web • Front-end • Back-end • Database • Cybersecurity •
              Progettazione • Analisi dati • AI • Machine learning •
              Ottimizzazione delle prestazioni • Esperienza utente •
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MainProfilePage
