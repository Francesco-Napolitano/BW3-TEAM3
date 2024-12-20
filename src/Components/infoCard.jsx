// Importazione delle dipendenze necessarie
import React, { useState, useEffect } from 'react' // Hook di React per gestire stato e ciclo di vita
import { Container, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap' // Componenti UI di React Bootstrap
import { FaCamera } from 'react-icons/fa' // Icona della fotocamera da react-icons
import axios from 'axios' // Client HTTP per le chiamate API
import { useDispatch } from 'react-redux' // Hook di Redux per dispatching delle azioni
import { authService } from '../services/authService' // Servizio per gestire l'autenticazione
import { useNavigate } from 'react-router-dom' // Hook per la navigazione

// Componente principale che mostra il profilo orizzontale
// Riceve props per i dati del profilo (nome, titolo, area, immagine, id, informazioni)
const HorizontalProfileCard = ({
  name,
  title,
  area,
  image,
  id,
  informazioni,
}) => {
  // Inizializzazione degli hook
  const dispatch = useDispatch() // Per dispatching azioni Redux
  const navigate = useNavigate() // Per la navigazione tra le pagine

  // Stati locali del componente
  const [bannerImage, setBannerImage] = useState(null) // Immagine banner
  const [menuVisible, setMenuVisible] = useState(false) // Visibilità menu dropdown
  const [showModal, setShowModal] = useState(false) // Visibilità modale modifica
  const [formData, setFormData] = useState({
    // Dati form modifica profilo
    nome: name || '',
    bio: title || '',
    posizione: area || '',
  })

  // Opzioni del menu dropdown "Disponibile per"
  const menuOptions = [
    {
      label: 'Lavoro a tempo pieno',
      description: 'Sto cercando un lavoro a tempo pieno.',
    },
    {
      label: 'Lavoro part-time',
      description: 'Sono disponibile per un lavoro part-time.',
    },
    {
      label: 'Collaborazioni',
      description: 'Cerco collaborazioni a progetto.',
    },
  ]

  // Handler per apertura/chiusura modale
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  // Handler per gestire i cambiamenti negli input del form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Funzione per aggiornare l'immagine del profilo tramite API
  const updateProfileImage = async (newImage) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'
    const endpoint = `https://striveschool-api.herokuapp.com/api/profile/${id}/picture`

    try {
      const formData = new FormData()
      formData.append('profile', newImage)

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        alert('Immagine aggiornata con successo!')
      } else {
        alert("Errore durante l'aggiornamento dell'immagine.")
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error)
      alert('Si è verificato un errore.')
    }
  }

  // Handler per il cambio dell'immagine banner
  const handleBannerChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target.result
        setBannerImage(result)
        updateProfileImage(file)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Seleziona un file immagine valido!')
    }
  }

  // Funzione per salvare le modifiche al profilo
  const handleSaveProfile = async () => {
    try {
      const token = authService.getToken()
      const response = await axios.put(
        'https://striveschool-api.herokuapp.com/api/profile/',
        {
          name: formData.nome,
          bio: formData.bio,
          area: formData.posizione,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        dispatch({
          type: 'profile/updateProfileSuccess',
          payload: response.data,
        })
        handleCloseModal()
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error)
      alert('Si è verificato un errore.')
    }
  }

  // Effect per controllare autenticazione e caricare profilo all'avvio
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/')
      return
    }
    fetchProfile()
  }, [navigate])

  // Funzione per recuperare i dati del profilo
  const fetchProfile = async () => {
    try {
      const token = authService.getToken()
      const response = await axios.get(
        'https://striveschool-api.herokuapp.com/api/profile/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.image) {
        setBannerImage(response.data.image)
      }

      dispatch({
        type: 'profile/setProfileData',
        payload: response.data,
      })
    } catch (error) {
      console.error('Errore nel recupero del profilo:', error)
      if (error.response?.status === 401) {
        authService.removeToken()
        navigate('/')
      }
    }
  }

  // Rendering del componente
  return (
    <Container className="mb-0 p-0">
      <Card className="border-0 shadow-sm p-0">
        <div className="position-relative">
          {/* Sezione Banner con possibilità di upload immagine */}
          <div
            className="profile-banner position-relative"
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f3f2ef',
              borderRadius: '8px 8px 0 0',
              overflow: 'hidden',
            }}
          >
            {bannerImage && (
              <img
                src={bannerImage}
                alt="Banner"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            )}
            <label
              className="camera-icon position-absolute"
              style={{
                right: '20px',
                bottom: '20px',
                background: 'white',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <FaCamera className="text-secondary" />
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Immagine profilo */}
          <div
            className="profile-image position-absolute"
            style={{
              left: '24px',
              bottom: '-40px',
              width: '152px',
              height: '152px',
              border: '4px solid white',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#f3f2ef',
            }}
          >
            <img
              src={image || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <Card.Body className="pt-5 mt-4 px-4">
          {/* Informazioni profilo */}
          <div className="profile-info mb-4 d-flex flex-column align-items-start">
            <div className="d-flex justify-content-between w-100">
              <div className="profile-details">
                <h2 className="fw-bold mb-1 text-start">{name}</h2>
                <p
                  className="text-muted mb-1 text-start"
                  style={{ fontSize: '1.1rem' }}
                >
                  {informazioni}
                </p>
                <div className="d-flex align-items-center gap-2 text-muted mb-2">
                  <span style={{ fontSize: '0.95rem' }}>{area}</span>
                  <span>·</span>
                  <span
                    className="text-primary cursor-pointer"
                    style={{ fontSize: '0.95rem' }}
                  >
                    Informazioni di contatto
                  </span>
                </div>
                <div className="connections mt-2 d-flex align-items-center gap-2">
                  <small className="text-primary fw-bold cursor-pointer">
                    Espandi la tua rete
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap mt-3">
            <Dropdown
              show={menuVisible}
              onToggle={() => setMenuVisible(!menuVisible)}
            >
              <Dropdown.Toggle
                variant="primary"
                className="rounded-pill px-3 fw-bold"
                style={{ minWidth: '150px' }}
              >
                Disponibile per
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-3" style={{ width: '300px' }}>
                {menuOptions.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    className="p-2 rounded hover-light"
                  >
                    <div>
                      <strong className="d-block mb-1">{option.label}</strong>
                      <small className="text-muted">{option.description}</small>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant="outline-primary"
              className="rounded-pill px-3 fw-bold"
              style={{ minWidth: '150px' }}
            >
              Aggiungi sezione
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill px-3 fw-bold"
              onClick={handleOpenModal}
              style={{ minWidth: '150px' }}
            >
              Modifica profilo
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modale modifica profilo */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username*</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Inserisci il tuo nome"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Descrivi il tuo ruolo professionale"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Località</Form.Label>
              <Form.Control
                type="text"
                name="posizione"
                value={formData.posizione}
                onChange={handleInputChange}
                placeholder="Es: Milano, Italia"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Salva modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default HorizontalProfileCard
