// Importiamo i componenti necessari da react-bootstrap per il layout della pagina
import { Col, Container, Row } from 'react-bootstrap'
// Importiamo gli stili CSS personalizzati per questa pagina
import '../styles/MainProfilePage.css'
// Importiamo gli hook di React per gestire lo stato e gli effetti collaterali
import { useEffect, useState } from 'react'
// Importiamo gli hook di Redux per interagire con lo store globale
import { useDispatch, useSelector } from 'react-redux'
// Importiamo le action creator per gestire le esperienze lavorative
import {
  fetchExperiences,
  addExperience, 
  deleteExperience,
} from '../redux/reducers/experiencesReducer'
// Importiamo i componenti di react-bootstrap per i modal e i form
import { Modal, Button, Form } from 'react-bootstrap'
// Importiamo il componente InfoCard che mostra le informazioni principali del profilo
import InfoCard from './infoCard.jsx'

// Componente principale che gestisce la visualizzazione del profilo utente
const MainProfilePage = ({ selectedProfileId }) => {
  // Stato per memorizzare i dati dell'utente corrente
  const [people, setPeople] = useState(null)
  // Stato per tenere traccia dell'ID utente selezionato
  const [selectedUserId, setSelectedUserId] = useState(null)

  // Token di autenticazione per le chiamate API (in produzione andrebbe gestito in modo più sicuro)
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'

  // Stati per gestire l'apertura/chiusura dei modal e i dati dei form
  const [showModal, setShowModal] = useState(false)
  // Stato per i dati di una nuova esperienza lavorativa
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  })
  // Stati per gestire il modal e i dati della formazione
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

  // Stato per le statistiche del profilo, inizializzato con dati dal sessionStorage o valori casuali
  const [profileStats, setProfileStats] = useState(() => {
    const savedStats = sessionStorage.getItem('profileStats')
    if (savedStats) {
      return JSON.parse(savedStats)
    }
    // Genera statistiche casuali se non presenti
    const newStats = {
      visits: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 1000) + 200,
      searches: Math.floor(Math.random() * 100) + 20,
    }
    sessionStorage.setItem('profileStats', JSON.stringify(newStats))
    return newStats
  })

  // Hook di Redux per dispatching delle azioni e accesso allo store
  const dispatch = useDispatch()
  const experiences = useSelector((state) => state.experiences.items)
  const isCurrentUser = true // Flag per determinare se è il profilo dell'utente corrente
  const connectionCount = useSelector((state) => state.connections.count)
  const profileData = useSelector(state => state.profile.profileData)

  // Funzione per recuperare i dati del profilo dall'API
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
        // Recupera le esperienze dopo aver ottenuto i dati del profilo
        dispatch(fetchExperiences(data._id))
      } else {
        console.error('Errore nella risposta:', await response.text())
      }
    } catch (error) {
      console.error('Errore nel caricamento del profilo:', error)
    }
  }

  // Effect hook per caricare i dati iniziali
  useEffect(() => {
    if (selectedProfileId) {
      setSelectedUserId(selectedProfileId)
      fetchUserExperiences(selectedProfileId)
    } else {
      getPeople()
    }
    loadEducationFromSession()
  }, [selectedProfileId])

  // Funzione per recuperare le esperienze di un utente specifico
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

  // Funzione per caricare i dati dell'educazione dal sessionStorage
  const loadEducationFromSession = () => {
    const savedEducation = sessionStorage.getItem('education')
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation))
    }
  }

  // Funzione per aggiungere una nuova esperienza lavorativa
  const handleAddExperience = () => {
    if (!people?._id) {
      console.error('ID utente non disponibile')
      return
    }

    // Formatta le date nel formato richiesto dall'API
    const formattedExperience = {
      ...newExperience,
      startDate: new Date(newExperience.startDate).toISOString().split('T')[0],
      endDate: newExperience.endDate
        ? new Date(newExperience.endDate).toISOString().split('T')[0]
        : null,
    }

    console.log('Adding experience:', formattedExperience)

    // Dispatch dell'azione per aggiungere l'esperienza
    dispatch(
      addExperience({
        userId: people._id,
        experienceData: formattedExperience,
      })
    )
      .unwrap()
      .then(() => {
        setShowModal(false)
        // Reset del form
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
    // Reset del form
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

  // Rendering del componente principale con tutte le sezioni del profilo
  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        <Col>
          <InfoCard
            name={profileData?.name || people?.name}
            title={profileData?.title || people?.title}
            area={profileData?.area || people?.area}
            image={profileData?.image || people?.image}
            id={profileData?._id || people?._id}
            informazioni={profileData?.bio || people?.bio}
          />
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
                {profileData.name}
              </span>
              , sono un{' '}
              <span className="fst-italic">
                {profileData.title === '' ? 'Web Developer' : profileData.title}{' '}
              </span>
              e vivo a <span className="fst-italic">{' ' + profileData.area} </span>.
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
                {profileData.email}
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
              Sviluppo web • Front-end • Back-end • Database • Cybersecurity •
              Progettazione • Analisi dati • AI • Machine learning •
              Ottimizzazione delle prestazioni • Esperienza utente •
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
