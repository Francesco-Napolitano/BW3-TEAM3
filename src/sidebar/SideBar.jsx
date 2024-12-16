import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import './SideBar.css'

const SideBar = () => {
  const [profilo, setProfilo] = useState(null)
  const [profiliSuggeriti, setProfiliSuggeriti] = useState([])

  const fetchMioProfilo = async () => {
    try {
      const risposta = await fetch('https://striveschool-api.herokuapp.com/api/profile/me', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'
        }
      })
      const dati = await risposta.json()
      setProfilo(dati)
    } catch (errore) {
      console.error('Errore nel recupero del profilo:', errore)
    }
  }

  const fetchProfiliSuggeriti = async () => {
    try {
      const risposta = await fetch('https://striveschool-api.herokuapp.com/api/profile/', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'
        }
      })
      const dati = await risposta.json()
      setProfiliSuggeriti(dati.slice(0, 5))
    } catch (errore) {
      console.error('Errore nel recupero dei profili suggeriti:', errore)
    }
  }

  useEffect(() => {
    fetchMioProfilo()
    fetchProfiliSuggeriti()
  }, [])

  return (
    <div className="sidebar">
      <Card className="profile-url-card">
        <div className="profile-url-title">
          <h5>Profilo pubblico e URL</h5>
          <i className="bi bi-pencil"></i>
        </div>
        <div className="profile-url">
          www.linkedin.com/in/francesco-s-255385205
        </div>
      </Card>

      <Card className="suggestions-card">
        <img 
          src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" 
          alt="LinkedIn Hiring" 
          className="w-100"
        />
        
        <div className="suggestions-header">
          <div className="suggestions-title">Persone che potresti conoscere</div>
          <div className="suggestions-subtitle">Dal tuo settore</div>
        </div>

        {profiliSuggeriti.map((profilo) => (
          <div key={profilo._id} className="profile-suggestion">
            <div className="d-flex align-items-start">
              <img 
                src={profilo.image} 
                alt="" 
                className="profile-image"
              />
              <div className="profile-info">
                <div className="profile-name">{profilo.name} {profilo.surname}</div>
                <div className="profile-title">{profilo.title}</div>
                <button className="connect-button">
                  <i className="bi bi-person-plus"></i>
                  Collegati
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="show-more">
          Mostra tutto
        </div>
      </Card>
    </div>
  )
}

export default SideBar
