import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import '../styles/LeftSidebarHome.css'

import { useDispatch, useSelector } from 'react-redux'
const LeftSidebarHome = () => {
  const savedPosts = useSelector((state) => state.profileName.name)
  const savedImage = useSelector((state) => state.profileName.profileImg)
  const lingueSalvate = useSelector((state) => state.profileName.lingue)
  const lingueFormattate = lingueSalvate
    .map((lingua, index) =>
      index === lingueSalvate.length - 1
        ? lingua
        : lingua.match(/^[A-Z]/)
        ? `${lingua} / `
        : lingua
    )
    .join(' ')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileData = useSelector(state => state.profile.profileData)
  const connectionCount = useSelector(state => state.connections.count)
  const profileStats = useSelector(state => state.profile.stats)
  
  // Stato per gestire l'espansione della bio
  const [isExpanded, setIsExpanded] = useState(false)

  // Funzione per troncare il testo
  const truncateText = (text, maxLength) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  // Funzione per recuperare i dati del profilo
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/me',
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_PROFILE_DATA', payload: data })
      }
    } catch (error) {
      console.error('Errore nel caricamento del profilo:', error)
    }
  }

  useEffect(() => {
    if (!profileData) {
      fetchProfileData()
    }
  }, [dispatch, profileData])

  return (
    <div className="d-none d-xl-block leftSidebarContainer">
      <div className="leftSidebar">
        <div className="profileCard">
          <div 
            className="profileBackground"
            style={{
              backgroundImage: profileData?.background ? `url(${profileData.background})` : 'none',
              backgroundColor: '#f3f2ef'
            }}
          ></div>
          
          <div className="profileImageContainer">
            <img 
              src={profileData?.image || 'https://via.placeholder.com/150'} 
              alt="profile" 
              className="profileImg"
            />
          <div className="profileBackground d-flex justify-content-center align-items-center">
            <img
              src={savedImage}
              alt="profile"
              id="imageProfie"
              className=" rounded-circle"
            />
          </div>

          <div className="profileInfo">
            <h3 
              onClick={() => navigate('/profile/me')} 
              className="profileName"
            >
              {profileData?.name || 'Il tuo nome'}
            </h3>
            
            {/* Bio con gestione espansione */}
            <div className="profileBio">
              {profileData?.bio && (
                <>
                  <p className={`bioText ${isExpanded ? 'expanded' : ''}`}>
                    {isExpanded ? profileData.bio : truncateText(profileData.bio, 100)}
                  </p>
                  {profileData.bio.length > 100 && (
                    <button 
                      className="expandButton"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? 'Mostra meno' : 'Mostra altro'}
                    </button>
                  )}
                </>
              )}
            </div>
            
            
            <p className="profileLocation">{profileData?.area || 'La tua località'}</p>
          </div>
        </div>
        <div className="statsSection">
          <div className="statItem">
            <span className="statLabel">Collegamenti al profilo</span>
            <span className="statValue">{connectionCount}</span>
          </div>
        </div>

        {/* Premium Promo */}
        <div className="premiumPromo">
          <p>LINKEDIN PRO (Paga 299€ al mese e trova un lavoro)</p>
          <button className="premiumButton">
            Dacci CASH per guadagnare CASH
          </button>
        </div>
        <div className="savedItems">
          <div className="savedItemsContent">
            <i className="bi bi-bookmark-fill text-warning"></i>
            <span>Elementi salvati</span>
          </div>
        </div>
      </div>

      {/* Recent Section */}
      <div className="rightSidebar mt-2">
        <div className="recentSection">
          <h5>I post più recenti</h5>
          <ul>
            <li>
              <i className="bi bi-people-fill"></i> Perché il nostro capo ci
              picchia?
            </li>
            <li>
              <i className="bi bi-people-fill"></i> 5 trucchi per avare
              un&apos;azienda più famoso di Google
            </li>
            <li>
              <i className="bi bi-people-fill"></i> COME VENDIAMO LE ROBE
              INUTILI?
            </li>
            <li>
              <i className="bi bi-people-fill"></i> 7 cibi che non devi mangiare
              prima del meeting con Elon Musk
            </li>
            <li>
              <i className="bi bi-people-fill"></i>Diventa il lupo di wallstreet
            </li>
          </ul>
        </div>

        <div className="recentSection">
          <h5>Groups</h5>
          <ul>
            <li>ESCI CON ME...DAL MATRIX</li>
            <li>GLI AMICI DEL CARCERE</li>
            <li>I MANAGER DI TOYOTA</li>
          </ul>
        </div>

        <div className="recentSection">
          <h5>Events</h5>
          <p>
            <i className="bi bi-cake-fill"></i> Elon Musk Party
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebarHome
