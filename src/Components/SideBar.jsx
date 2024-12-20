// Importazione delle dipendenze necessarie da React e React Bootstrap
import { useEffect, useState } from 'react'
import {
  Card,
  Modal,
  Button,
  Form,
  Badge,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import '../styles/SideBar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {
  const savedPosts = useSelector((state) => state.profileName.lingue)
  // Definizione degli stati per gestire i dati e le funzionalità della sidebar
  const [profilo, setProfilo] = useState(null) // Stato per il profilo utente
  const [profiliSuggeriti, setProfiliSuggeriti] = useState([]) // Stato per i profili suggeriti
  const [tuttiProfili, setTuttiProfili] = useState([]) // Stato per tutti i profili disponibili
  const [profiliFiltrati, setProfiliFiltrati] = useState(5) // Numero di profili da mostrare
  const [showModal, setShowModal] = useState(false) // Stato per controllare la visibilità del modal
  const [nuovaLingua, setNuovaLingua] = useState('') // Stato per la nuova lingua da aggiungere
  const [modalitaModifica, setModalitaModifica] = useState(false) // Stato per la modalità modifica lingue
  const [lingue, setLingue] = useState(savedPosts) // Array delle lingue conosciute
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [connectedProfiles, setConnectedProfiles] = useState(new Set())

  // Funzioni per gestire l'apertura e chiusura del modal
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  // Funzione per aggiungere una nuova lingua
  const aggiungiLingua = () => {
    if (nuovaLingua.trim() !== '') {
      setLingue([...lingue, nuovaLingua.trim()])
      setNuovaLingua('')
      handleClose()
    }
  }

  // Funzione per rimuovere una lingua esistente
  const rimuoviLingua = (linguaDaRimuovere) => {
    if (modalitaModifica) {
      setLingue(
        lingue.filter((lingua) => lingua !== linguaDaRimuovere),
        dispatch({
          type: 'RIMUOVI_LINGUA',
          payload: linguaDaRimuovere,
        })
      )
    }
  }

  // Funzione per attivare/disattivare la modalità modifica
  const toggleModalitaModifica = () => {
    setModalitaModifica(!modalitaModifica)
  }

  // Funzione per recuperare i dati del profilo utente dall'API
  const fetchMioProfilo = async () => {
    try {
      const risposta = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/me',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE',
          },
        }
      )
      const dati = await risposta.json()
      setProfilo(dati)
    } catch (errore) {
      console.error('Errore nel recupero del profilo:', errore)
    }
  }

  // Funzione per recuperare i profili suggeriti dall'API
  const fetchProfiliSuggeriti = async () => {
    try {
      const risposta = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE',
          },
        }
      )
      const dati = await risposta.json()
      // Mescola casualmente l'array dei profili
      const profiliMescolati = [...dati].sort(() => Math.random() - 0.5)
      setTuttiProfili(profiliMescolati)
      setProfiliSuggeriti(profiliMescolati.slice(0, profiliFiltrati))
    } catch (errore) {
      console.error('Errore nel recupero dei profili suggeriti:', errore)
    }
  }

  // Funzione per gestire la visualizzazione di tutti i profili
  const handleShowAllProfiles = () => {
    console.log('Mostra tutti i profili')
  }

  // Funzione per mostrare più profili suggeriti
  const handleMostraTutto = () => {
    // Aumenta il numero di profili da mostrare di 5
    const nuovoNumero = profiliFiltrati + 5
    setProfiliFiltrati(nuovoNumero)
    // Aggiorna i profili mostrati
    setProfiliSuggeriti(tuttiProfili.slice(0, nuovoNumero))
  }

  // Funzione per gestire il click su un profilo suggerito
  const handleProfileClick = (profilo) => {
    if (profilo?._id) {
      navigate(`/profile/${profilo._id}`)
    }
  }

  const handleConnect = (profileId, event) => {
    event.stopPropagation() // Previene la navigazione quando si clicca sul pulsante

    if (!connectedProfiles.has(profileId)) {
      dispatch({ type: 'ADD_CONNECTION' })
      setConnectedProfiles((prev) => new Set([...prev, profileId]))
    }
  }

  // Effect per caricare i dati iniziali
  useEffect(() => {
    fetchMioProfilo()
    fetchProfiliSuggeriti()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const profileData = useSelector((state) => state.profile.profileData)

  // Rendering del componente
  return (
    <Container>
      <Row>
        <Col className="d-none d-lg-block">
          <div className="sidebar position-sticky top-0">
            {/* Card per la gestione delle lingue conosciute */}
            <Card className="languages-card shadow-sm mb-2">
              <div className="languages-header">
                <h5>Lingue conosciute</h5>
                <div className="languages-buttons">
                  <button
                    className={`edit-button ${
                      modalitaModifica ? 'active' : ''
                    }`}
                    onClick={toggleModalitaModifica}
                    title="Modalità rimozione"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="edit-button"
                    onClick={handleShow}
                    title="Aggiungi lingua"
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
              <div className="languages-content">
                {lingue.map((lingua, index) => (
                  <Badge
                    key={index}
                    className={`language-pill me-2 mb-2 ${
                      modalitaModifica ? 'removable' : ''
                    }`}
                    onClick={() => rimuoviLingua(lingua)}
                  >
                    {lingua}
                    {modalitaModifica && <i className="bi bi-x"></i>}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Modal per aggiungere una nuova lingua */}
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Aggiungi una lingua</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci una lingua"
                    value={nuovaLingua}
                    onChange={(e) => {
                      setNuovaLingua(e.target.value)
                    }}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Chiudi
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    aggiungiLingua()
                    dispatch({
                      type: 'NUOVA_LINGUA',
                      payload: nuovaLingua,
                    })
                  }}
                >
                  Aggiungi
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Card per mostrare l'URL del profilo */}
            <Card className="profile-url-card">
              <div className="profile-url-title">
                <h5>Profilo pubblico e URL</h5>
              </div>
              <div className="profile-url">
                www.linkedin.com/in/
                {profileData?.name.replace(/\s/g, '').toLowerCase()}
                -255385205
              </div>
            </Card>

            {/* Card per i profili suggeriti */}
            <Card className="suggestions-card">
              <button
                className="hiring-image-button"
                onClick={handleShowAllProfiles}
              >
                <img
                  src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                  alt="LinkedIn Hiring"
                  className="w-100"
                />
              </button>

              <div className="suggestions-header">
                <div className="suggestions-title">
                  Persone che potresti conoscere
                </div>
                <div className="suggestions-subtitle">Dal tuo settore</div>
              </div>

              {/* Lista dei profili suggeriti */}
              {profiliSuggeriti.map((profilo) => (
                <div
                  key={profilo._id}
                  className="profile-suggestion"
                  onClick={() => handleProfileClick(profilo)}
                >
                  <div className="d-flex align-items-start">
                    <img src={profilo.image} alt="" className="profile-image" />
                    <div className="profile-info">
                      <div className="profile-name">
                        {profilo.name} {profilo.surname}
                      </div>
                      <div className="profile-title">{profilo.title}</div>
                      <button
                        className={`connect-button ${
                          connectedProfiles.has(profilo._id) ? 'connected' : ''
                        }`}
                        onClick={(e) => handleConnect(profilo._id, e)}
                        disabled={connectedProfiles.has(profilo._id)}
                      >
                        <i
                          className={`bi ${
                            connectedProfiles.has(profilo._id)
                              ? 'bi-person-check'
                              : 'bi-person-plus'
                          }`}
                        ></i>
                        {connectedProfiles.has(profilo._id)
                          ? 'Collegato'
                          : 'Collegati'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pulsante per mostrare più profili */}
              <div className="show-more" onClick={handleMostraTutto}>
                Mostra tutto
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SideBar
