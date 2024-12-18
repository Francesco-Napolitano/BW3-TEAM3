// Importazione delle dipendenze necessarie
import { Col, Container, Row } from 'react-bootstrap' // Componenti React Bootstrap per il layout
import '../styles/MainProfilePage.css' // Stili CSS personalizzati
import { useEffect } from 'react' // Hook per gestire effetti collaterali
import { useSelector, useDispatch } from 'react-redux' // Hook per Redux
import { fetchSelectedProfile } from '../redux/reducers/selectedProfileReducer' // Action creator per caricare il profilo

// Componente principale che mostra il profilo di un utente
const UsersProfilePage = ({ selectedUserId }) => {
  const dispatch = useDispatch()
  // Estrae i dati del profilo dallo store Redux
  const { profile, status, error } = useSelector((state) => state.selectedProfile)

  // Funzione helper per generare numeri casuali per le statistiche
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Oggetto con statistiche casuali del profilo
  const profileStats = {
    connections: getRandomNumber(100, 500),
    impressions: getRandomNumber(50, 200), 
    searches: getRandomNumber(20, 100)
  }

  // Effect hook per caricare il profilo quando cambia l'ID utente
  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchSelectedProfile(selectedUserId))
    }
  }, [selectedUserId, dispatch])

  // Gestione degli stati di caricamento
  if (status === 'loading') {
    return (
      <Container fluid>
        <Row className="row-cols-1 g-4">
          <Col className="p-4 bg-white rounded-4 shadow-sm">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="mt-2">Caricamento profilo...</p>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  // Gestione degli errori
  if (status === 'failed') {
    return (
      <Container fluid>
        <Row className="row-cols-1 g-4">
          <Col className="p-4 bg-white rounded-4 shadow-sm">
            <div className="text-center text-danger">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
              <p className="mt-2">Errore: {error}</p>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  // Gestione caso nessun profilo selezionato
  if (!profile) {
    return (
      <Container fluid>
        <Row className="row-cols-1 g-4">
          <Col className="p-4 bg-white rounded-4 shadow-sm">
            <div className="text-center text-muted">
              <i className="bi bi-person-x fs-1"></i>
              <p className="mt-2">Nessun profilo selezionato</p>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  // Rendering principale del profilo
  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        {/* Sezione principale con immagine profilo e background */}
        <Col className="p-0 bg-white rounded-4 shadow-sm overflow-hidden">
          {/* Background Image con effetto blur */}
          <div 
            className="profile-background" 
            style={{ 
              height: '200px',
              backgroundColor: '#1a75ff',
              backgroundImage: profile.image ? `url(${profile.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px)',
              opacity: '0.7'
            }}
          />
          
          {/* Contenuto del profilo */}
          <div className="p-4 position-relative">
            {/* Immagine profilo sovrapposta */}
            <div 
              className="profile-image-container position-absolute"
              style={{ 
                top: '-75px',
                left: '50px'
              }}
            >
              <img 
                src={profile.image || 'https://via.placeholder.com/150'} 
                alt={`${profile.name} ${profile.surname}`}
                className="rounded-circle border border-4 border-white shadow"
                style={{ 
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Informazioni principali del profilo */}
            <div className="mt-5 pt-4">
              <h1 className="mb-3">
                {profile.name} {profile.surname}
                <span className="ms-2 fs-5 text-muted">({profile.area})</span>
              </h1>
              <h2 className="h4 text-primary mb-4">{profile.title || 'Web Developer'}</h2>
              
              <div className="d-flex flex-column align-items-start text-start">
                <h3 className="h5 mb-3">Informazioni</h3>
                <p className="m-0 lh-lg">
                  Mi chiamo{' '}
                  <span className="fw-bold">{profile.name} {profile.surname}</span>, 
                  sono {' '}
                  <span className="fw-bold">
                    {profile.title || 'Web Developer'}{' '}
                  </span>
                  e vivo a <span className="fw-bold">{profile.area}</span>.
                  <br />
                  {profile.bio || `La mia carriera è iniziata come freelancer, e oggi sono orgoglioso
                  di collaborare con clienti e team per sviluppare soluzioni web
                  end-to-end, con competenze che spaziano dalla progettazione
                  front-end allo sviluppo back-end.`}
                  <br /><br />
                  Email: <span className="text-primary">{profile.email}</span>
                </p>
              </div>
            </div>
          </div>
        </Col>

        {/* Sezione statistiche del profilo */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <Row className="text-start">
            <h2 className="d-flex">Analisi</h2>
            <Col xs={12} lg={4}>
              <i className="bi bi-people-fill me-3 fs-3"></i>
              <span className="">{profileStats.connections} persone collegate</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-bar-chart-fill me-3 fs-3"></i>
              <span className="">{profileStats.impressions} impressioni del post</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-search me-3 fs-3"></i>
              <span className="">{profileStats.searches} ricerche del profilo</span>
            </Col>
          </Row>
        </Col>

        {/* Sezione esperienze lavorative */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Esperienze</h2>
            {profile.experiences && profile.experiences.map((exp) => (
              <div
                key={exp._id}
                className="experience-card w-100 mt-3 p-3 border rounded"
              >
                <h5>{exp.role}</h5>
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

        {/* Sezione formazione/istruzione */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Formazione</h2>
            {profile.education && profile.education.map((edu) => (
              <div
                key={edu._id}
                className="education-card w-100 mt-3 p-3 border rounded"
              >
                <div className="d-flex gap-3">
                  <div className="w-100">
                    <h5>{edu.school}</h5>
                    <p className="mb-1">{edu.degree}</p>
                    <p className="text-muted">
                      {new Date(edu.startDate).toLocaleDateString()} -
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

        {/* Sezione lingue conosciute */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Lingue</h2>
            {profile.languages && profile.languages.map((lang, index) => (
              <p key={index} className="m-0">{lang}</p>
            ))}
            {(!profile.languages || profile.languages.length === 0) && (
              <>
                <p className="m-0">Italiano</p>
                <p className="m-0">Inglese</p>
              </>
            )}
          </div>
        </Col>

        {/* Sezione interessi con collegamenti a profili seguiti */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start gap-3">
            <h2 className="m-0">Interessi</h2>
            <div className="d-flex gap-3">
              <img
                className="interests-img rounded-circle"
                src="https://media.licdn.com/dms/image/C4E0BAQHYgix-Ynux1A/company-logo_100_100/0/1646830188798/epicodeschool_logo?e=1745280000&v=beta&t=nMpOFoSqTxk7IMGz6KANJtRHXAI7Oy_OHV-8RBxwZJE"
                alt="epicode picture"
              />
              <div>
                <p className="m-0">
                  EPICODE <i className="bi bi-linkedin text-primary"></i>
                </p>
                <p className="m-0 interests-writes text-secondary">
                  Azienda • E-learning
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
                  Mark Zuckerberg <i className="bi bi-linkedin text-primary"></i>
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

        {/* Sezione argomenti di interesse */}
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

export default UsersProfilePage
