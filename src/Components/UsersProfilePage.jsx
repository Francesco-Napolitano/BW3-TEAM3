import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSelectedProfile } from '../redux/reducers/selectedProfileReducer'
import { Container, Row, Col } from 'react-bootstrap'
import InfoCard from './infoCard.jsx'

const UsersProfilePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { profile, status, error } = useSelector((state) => state.selectedProfile)

  // Funzione per generare e salvare statistiche per un utente specifico
  const getOrCreateUserStats = (userId) => {
    const savedStats = sessionStorage.getItem(`profileStats_${userId}`)
    if (savedStats) {
      return JSON.parse(savedStats)
    }
    
    // Genera nuove statistiche casuali per questo utente
    const newStats = {
      visits: Math.floor(Math.random() * 500) + 100,
      impressions: Math.floor(Math.random() * 1000) + 200,
      searches: Math.floor(Math.random() * 100) + 20
    }
    
    // Salva le statistiche nel sessionStorage con l'ID dell'utente
    sessionStorage.setItem(`profileStats_${userId}`, JSON.stringify(newStats))
    return newStats
  }

  // Ottieni le statistiche quando il profilo viene caricato
  const profileStats = profile ? getOrCreateUserStats(profile._id) : null

  useEffect(() => {
    console.log('Profilo caricato:', profile)
    if (id) {
      dispatch(fetchSelectedProfile(id))
    }
  }, [id, dispatch])

  if (status === 'loading') {
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

  if (status === 'failed' || !profile) {
    return (
      <Container fluid>
        <Row className="row-cols-1 g-4">
          <Col className="p-4 bg-white rounded-4 shadow-sm">
            <div className="text-center">
              <span>Errore nel caricamento del profilo: {error}</span>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid>
      <Row className="row-cols-1 g-4">
        {/* Sezione InfoCard con gestione immagine profilo */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start position-relative">
            {/* Banner di sfondo */}
            <div 
              className="profile-background w-100" 
              style={{ 
                height: '200px',
                backgroundColor: '#1d2226',
                borderRadius: '8px 8px 0 0'
              }}
            />
            
            {/* Immagine profilo */}
            <div className="position-relative" style={{ marginTop: '-6rem', marginLeft: '24px' }}>
              <img
                src={profile.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} // Immagine di fallback
                alt={`${profile.name} ${profile.surname}`}
                className="rounded-circle border border-white border-3"
                style={{
                  width: '152px',
                  height: '152px',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.onerror = null; // Previene loop infiniti
                  e.target.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
                }}
              />
            </div>

            {/* Informazioni profilo */}
            <div className="mt-3 ms-4">
              <h2 className="mb-0">{profile.name} {profile.surname}</h2>
              <p className="mb-1">{profile.title || 'Web Developer'}</p>
              <p className="text-muted mb-2">
                {profile.area} • 
                <a href={`mailto:${profile.email}`} className="text-primary text-decoration-none ms-1">
                  Informazioni di contatto
                </a>
              </p>
              <p className="text-muted">500+ collegamenti</p>
            </div>
          </div>
        </Col>

        {/* Sezione Informazioni */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Informazioni</h2>
            <p className="m-0">
              Ciao! Mi chiamo{' '}
              <span className="fst-italic">{profile.name}</span>, sono{' '}
              <span className="fst-italic">
                {profile.title === '' ? 'Web Developer' : profile.title}{' '}
              </span>
              e vivo a <span className="fst-italic">{' ' + profile.area} </span>.
              La mia carriera è iniziata come freelancer, e oggi sono orgoglioso
              di collaborare con clienti e team per sviluppare soluzioni web
              end-to-end.
              <br /> <br />
              Se vuoi metterti in contatto con me, scrivimi pure a{' '}
              <span className="fst-italic">{profile.email}</span>{' '}
              o connettiti su LinkedIn per discutere di nuove opportunità o
              collaborazioni!
            </p>
          </div>
        </Col>

        {/* Sezione Analisi aggiornata */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <Row className="text-start">
            <h2 className="d-flex">Analisi</h2>
            <Col xs={12} lg={4}>
              <i className="bi bi-people-fill me-3 fs-3"></i>
              <span className="">{profileStats?.visits || 0} collegamenti al profilo</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-bar-chart-fill me-3 fs-3"></i>
              <span className="">{profileStats?.impressions || 0} impressioni del post</span>
            </Col>
            <Col xs={12} lg={4}>
              <i className="bi bi-search me-3 fs-3"></i>
              <span className="">{profileStats?.searches || 0} ricerche del profilo</span>
            </Col>
          </Row>
        </Col>

        {/* Sezione Esperienze */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Esperienze</h2>
            {profile.experiences && profile.experiences.map((exp, index) => (
              <div key={index} className="experience-card w-100 mt-3 p-3 border rounded">
                <div className="d-flex justify-content-between">
                  <h5>{exp.role}</h5>
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

        {/* Sezione Formazione */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Formazione</h2>
            {profile.education && profile.education.map((edu, index) => (
              <div key={index} className="education-card w-100 mt-3 p-3 border rounded">
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

        {/* Sezione Lingue */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Lingue</h2>
            <p className="m-0">Italiano</p>
            <p className="m-0">Inglese</p>
          </div>
        </Col>

        {/* Sezione Interessi */}
        <Col className="p-4 bg-white rounded-4 shadow-sm">
          <div className="d-flex flex-column align-items-start text-start">
            <h2>Argomenti di interesse</h2>
            <p className="m-0">
              Sviluppo web • Front-end • Back-end • Database • Cybersecurity •
              Progettazione • Analisi dati • AI • Machine learning •
              Ottimizzazione delle prestazioni • Esperienza utente
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UsersProfilePage
