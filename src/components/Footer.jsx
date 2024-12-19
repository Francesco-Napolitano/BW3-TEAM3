import '../styles/Footer.css'
import { useState } from 'react'

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <footer className="footer-container mt-5" style={{ paddingTop: '5rem' }}>
      <div className="footer-section">
        <ul>
          <li>About</li>
          <li>Professional Community Policies</li>
          <li>
            Privacy & Terms
            <span className="arrow" onClick={toggleMenu}>
              &#9662;
            </span>
            {isOpen && (
              <ul className="dropdown-menu">
                <li>Privacy Policy</li>
                <li>User Agreement</li>
                <li>Pages Terms</li>
                <li>Cookie Policy</li>
                <li>Copyright Policy</li>
                <li>Your California Privacy Choices</li>
              </ul>
            )}
          </li>
          <li>Sales Solutions</li>
          <li>Safety Center</li>
        </ul>
      </div>

      <div className="footer-section">
        <ul>
          <li>Accessibility</li>
          <li>Careers</li>
          <li>Ad Choices</li>
          <li>Mobile</li>
        </ul>
      </div>

      <div className="footer-section">
        <ul>
          <li>Talent Solutions</li>
          <li>Marketing Solutions</li>
          <li>Advertising</li>
          <li>Small Business</li>
        </ul>
      </div>

      <div className="footer-section">
        <div className="footer-icon">
          <div>
            <i
              className="bi bi-question-circle-fill"
              style={{ marginRight: '0.5em' }}
            ></i>
            <strong>Questions?</strong>
            <p>Visit our Help Center.</p>
          </div>
        </div>

        <div className="footer-icon">
          <i className="bi bi-gear-fill" style={{ marginRight: '0.5em' }}></i>
          <div>
            <strong>Manage your account and privacy</strong>
            <p>Go to your Settings.</p>
          </div>
        </div>

        <div className="footer-icon">
          <i className="bi bi-shield-shaded"></i>
          <div>
            <strong>Recommendation transparency</strong>
            <p>Learn more about Recommended Content.</p>
          </div>
        </div>
      </div>

      <div className="footer-lang">
        <label htmlFor="language">Select Language</label>
        <div>
          <select id="language">
            <option>English (English)</option>
            <option>Italian (Italian)</option>
            <option>French (French)</option>
            <option>German (German)</option>
            <option>Persian (Persian)</option>
          </select>
        </div>
      </div>

      <div className="footer-bottom">LinkedIn Corporation &copy; 2024</div>
    </footer>
  )
}

export default Footer
