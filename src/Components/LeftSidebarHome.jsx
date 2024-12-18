import { useNavigate } from 'react-router-dom'
import '../styles/LeftSidebarHome.css'
const LeftSidebarHome = () => {
  const navigate = useNavigate()
  return (
    <div className="d-none d-xl-block leftSidebar ">
      <div className="leftSidebar">
        {/* Header Section */}
        <div className="profileCard">
          <div className="profileBackground"></div>
          <div className="profileImage">
            <img src="" alt="profile" />
          </div>
          <div className="profileDetails">
            <h3>ANDREW TATE</h3>
            <p>English & Elvish</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profileStats w-100">
          <div className="statItem">
            <span>Visualizzatori del profilo</span>
            <span className="statValue">4</span>
          </div>
          <div className="statItem">
            <span>Pubblica impressioni</span>
            <span className="statValue">4</span>
          </div>
        </div>

        {/* Sales Navigator Promo */}
        <div className="salesPromo">
          <p>LINKEDIN PRO (Paga 299€ al mese e trova un lavoro)</p>
          <button className="salesButton">
            Dacci CASH per guadagnare CASH
          </button>
        </div>

        {/* Saved Items */}
        <div>
          <div
            onClick={() => navigate('/favourites')}
            className={
              'd-flex align-items-center justify-content-center p-3 gap-1'
            }
          >
            <i className="bi bi-bookmark-fill text-warning"></i>
            <p style={{ cursor: 'pointer' }} className="d-none d-lg-block m-0">
              Elementi salvati
            </p>
          </div>
        </div>
      </div>

      <div className="rightSidebar">
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
