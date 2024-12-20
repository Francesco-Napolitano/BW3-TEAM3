// Importiamo i componenti necessari da react-bootstrap per il layout
import { Col, Container, Row } from 'react-bootstrap'
// Importiamo il file CSS per gli stili personalizzati
import '../styles/MainProfilePage.css'
// Importiamo gli hook di React che useremo
import { useEffect, useState } from 'react'
// Importiamo gli hook di Redux per gestire lo stato globale
import { useDispatch, useSelector } from 'react-redux'
// Importiamo le azioni per gestire le esperienze lavorative
import {
  fetchExperiences,
  addExperience,
  deleteExperience,
} from '../redux/reducers/experiencesReducer'
// Importiamo altri componenti di react-bootstrap per i modal e i form
import { Modal, Button, Form } from 'react-bootstrap'
import InfoCard from '../Components/infoCard.jsx'

// Componente principale della pagina profilo
const MainProfilePage = ({ selectedProfileId }) => {
  // Stato per memorizzare i dati dell'utente
  const [people, setPeople] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)

  // Token di autenticazione (in un'app reale dovrebbe essere gestito in modo più sicuro)
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'

  // Stati per gestire i modal e i form
  const [showModal, setShowModal] = useState(false)
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  })
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  })
  const [education, setEducation] = useState([])

  // Aggiungi questo nuovo stato per le statistiche
  const [profileStats, setProfileStats] = useState(() => {
    // Controlla se esistono già dei dati nel sessionStorage
    const savedStats = sessionStorage.getItem('profileStats')
    if (savedStats) {
      return JSON.parse(savedStats)
    }
    // Se non esistono, genera nuovi numeri casuali
    const newStats = {
      visits: Math.floor(Math.random() * 500) + 100, // Numero tra 100 e 600
      impressions: Math.floor(Math.random() * 1000) + 200, // Numero tra 200 e 1200
      searches: Math.floor(Math.random() * 100) + 20, // Numero tra 20 e 120
    }
    // Salva i nuovi numeri nel sessionStorage
    sessionStorage.setItem('profileStats', JSON.stringify(newStats))
    return newStats
  })

  // Hook di Redux
  const dispatch = useDispatch()
  const experiences = useSelector((state) => state.experiences.items)
  const isCurrentUser = true // Flag per verificare se è l'utente corrente
  const connectionCount = useSelector((state) => state.connections.count)

  // Funzione per recuperare i dati del profilo
  const getPeople = async () => {
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        setPeople(data)
        dispatch(fetchExperiences(data._id))
      } else {
        console.error('Errore nella risposta:', await response.text())
      }
    } catch (error) {
      console.error('Errore nel caricamento del profilo:', error)
    }
  }

  // useEffect per caricare i dati al mount del componente
  useEffect(() => {
    if (selectedProfileId) {
      setSelectedUserId(selectedProfileId)
      fetchUserExperiences(selectedProfileId)
    } else {
      getPeople()
    }
    loadEducationFromSession()
  }, [selectedProfileId])

  const fetchUserExperiences = async (userId) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        dispatch(fetchExperiences(data))
      } else {
        console.error('Errore nella risposta:', await response.text())
      }
    } catch (error) {
      console.error('Errore nel caricamento delle esperienze:', error)
    }
  }

  // Funzione per caricare l'educazione dal sessionStorage
  const loadEducationFromSession = () => {
    const savedEducation = sessionStorage.getItem('education')
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation))
    }
  }

  // Funzione per aggiungere una nuova esperienza
  const handleAddExperience = () => {
    if (!people?._id) {
      console.error('ID utente non disponibile')
      return
    }

    // Formattiamo le date prima di inviarle
    const formattedExperience = {
      ...newExperience,
      startDate: new Date(newExperience.startDate).toISOString().split('T')[0],
      endDate: newExperience.endDate
        ? new Date(newExperience.endDate).toISOString().split('T')[0]
        : null,
    }

    console.log('Adding experience:', formattedExperience)

    // Dispatchiamo l'azione per aggiungere l'esperienza
    dispatch(
      addExperience({
        userId: people._id,
        experienceData: formattedExperience,
      })
    )
      .unwrap()
      .then(() => {
        setShowModal(false)
        setNewExperience({
          role: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
          area: '',
        })
      })
      .catch((error) => {
        console.error("Errore nell'aggiunta dell'esperienza:", error)
      })
  }

  // Funzione per eliminare un'esperienza
  const handleDeleteExperience = (expId) => {
    dispatch(deleteExperience({ userId: people._id, expId }))
  }

  // Funzione per aggiungere una nuova formazione
  const handleAddEducation = () => {
    const updatedEducation = [...education, newEducation]
    setEducation(updatedEducation)
    sessionStorage.setItem('education', JSON.stringify(updatedEducation))
    setShowEducationModal(false)
    setNewEducation({
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
      area: '',
    })
  }

  // Funzione per eliminare una formazione
  const handleDeleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index)
    setEducation(updatedEducation)
    sessionStorage.setItem('education', JSON.stringify(updatedEducation))
  }

  const lingueSalvate = useSelector((state) => state.profileName.lingue)
  const lingueFormattate = lingueSalvate.map((lingua, index) => (
    <p key={index}>{lingua}</p>
  ))

  // Mostra un loader mentre i dati vengono caricati
  if (!people) {
    return (
      <Container fluid>
        <Row className="row-cols-1 g-4">
          <Col className="p-4 bg-white rounded-4 shadow-sm">
            <div className="text-center">
              <span>Caricamento profilo...</span>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  // Il render principale del componente
  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        <Col
          xs={12}
          className=" bg-white rounded-4 shadow-sm p-0"
          style={{ padding: '0 !important' }}
        >
          <div className="d-flex flex-column align-items-start text-start">
            <InfoCard
              name={people.name}
              title={people.title}
              area={people.area}
              email={people.email}
              image={people.image}
              informazioni={people.bio}
              id={people._id}
              description="La mia carriera è iniziata come freelancer, e oggi sono orgoglioso di collaborare con clienti e team per sviluppare soluzioni web end-to-end."
              onImageChange={() => alert('Cambia immagine profilo!')}
            />
          </div>
        </Col>
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
              , sono un{' '}
              <span className="fst-italic">
                {people.title === '' ? 'Web Developer' : people.title}{' '}
              </span>
              e vivo a <span className="fst-italic">{' ' + people.area} </span>.
              La mia carriera è iniziata come freelancer, e oggi sono orgoglioso
              di collaborare con clienti e team per sviluppare soluzioni web
              end-to-end, con competenze che spaziano dalla progettazione
              front-end allo sviluppo back-end. <br /> <br /> Nel corso degli
              anni ho acquisito esperienza lavorando su progetti di diverse
              dimensioni, dal piccolo sito web personale a piattaforme compless
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
              <span className="">
                {connectionCount} collegamenti al profilo
              </span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-bar-chart-fill me-3 fs-3"></i>
              <span className="">
                {profileStats.impressions} impressioni del post
              </span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-search me-3 fs-3"></i>
              <span className="">
                {profileStats.searches} ricerche del profilo
              </span>
            </Col>
          </Row>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <div className="d-flex justify-content-between w-100">
              <h2>Formazione</h2>
              {isCurrentUser && (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowEducationModal(true)}
                >
                  <i className="bi bi-plus-lg"></i> Aggiungi formazione
                </Button>
              )}
            </div>

            {education.map((edu, index) => (
              <div
                key={index}
                className="education-card w-100 mt-3 p-3 border rounded"
              >
                <div className="d-flex gap-3">
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h5>{edu.school}</h5>
                      {isCurrentUser && (
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => handleDeleteEducation(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      )}
                    </div>
                    <p className="mb-1">{edu.degree}</p>
                    <p className="text-muted">
                      {new Date(edu.startDate).toLocaleDateString()} -{' '}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : 'Presente'}
                    </p>
                    <p>{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <div className="d-flex justify-content-between w-100">
              <h2>Esperienze</h2>
              {selectedUserId === null && (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-plus-lg"></i> Aggiungi esperienza
                </Button>
              )}
            </div>

            {experiences &&
              experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="experience-card w-100 mt-3 p-3 border rounded"
                >
                  <div className="d-flex justify-content-between">
                    <h5>{exp.role}</h5>
                    {selectedUserId === null && (
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => handleDeleteExperience(exp._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                  </div>
                  <p className="mb-1">
                    {exp.company} - {exp.area}
                  </p>
                  <p className="text-muted">
                    {new Date(exp.startDate).toLocaleDateString()} -
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : 'Presente'}
                  </p>
                  <p>{exp.description}</p>
                </div>
              ))}
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2 className="mb-3">Lingue</h2>
            <p className="m-0">{lingueFormattate}</p>
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
              </div>
            </div>
          </div>
        </Col>
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Argomenti di interesse</h2>
            <p className="m-0">
              Sviluppo web • Sviluppo Front-end • Sviluppo Back-end • Basi di
              dati • Intelligenza artificiale • Apprendimento automatico •
              Ottimizzazione delle performance • Esperienza d'uso •
            </p>
          </div>
        </Col>
      </Row>

      {/* Modal per aggiungere una nuova formazione */}
      <Modal
        show={showEducationModal}
        onHide={() => setShowEducationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi formazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Scuola/Università</Form.Label>
              <Form.Control
                type="text"
                value={newEducation.school}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, school: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Titolo di studio</Form.Label>
              <Form.Control
                type="text"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data inizio</Form.Label>
              <Form.Control
                type="date"
                value={newEducation.startDate}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    startDate: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data fine</Form.Label>
              <Form.Control
                type="date"
                value={newEducation.endDate}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                value={newEducation.description}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Località</Form.Label>
              <Form.Control
                type="text"
                value={newEducation.area}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, area: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEducationModal(false)}
          >
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleAddEducation}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal per aggiungere esperienza */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo*</Form.Label>
              <Form.Control
                type="text"
                required
                value={newExperience.role}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, role: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Azienda*</Form.Label>
              <Form.Control
                type="text"
                required
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data inizio*</Form.Label>
              <Form.Control
                type="date"
                required
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data fine</Form.Label>
              <Form.Control
                type="date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione*</Form.Label>
              <Form.Control
                as="textarea"
                required
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Località*</Form.Label>
              <Form.Control
                type="text"
                required
                value={newExperience.area}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, area: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button
            variant="primary"
            onClick={handleAddExperience}
            disabled={
              !newExperience.role ||
              !newExperience.company ||
              !newExperience.startDate
            }
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default MainProfilePage
