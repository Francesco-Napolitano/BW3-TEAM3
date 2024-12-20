// Importazione delle dipendenze necessarie
import React, { useState } from 'react' // Hook per gestire lo stato
import { useDispatch, useSelector } from 'react-redux' // Hook per Redux
import { login } from '../actions/authActions' // Action creator per il login
import { RootState, AppDispatch } from '../store/store' // Tipi per Redux store
import '../styles/Login.css' // Stili CSS
import { useNavigate } from 'react-router-dom' // Hook per la navigazione
import { authService } from '../services/authService' // Servizio di autenticazione

// Componente funzionale per la pagina di login
const Login: React.FC = () => {
  // Inizializzazione dispatch per Redux
  const dispatch = useDispatch<AppDispatch>()
  
  // Selezione dello stato di loading ed error dallo store Redux
  const { loading, error } = useSelector(
    (state: RootState) => state.auth || { loading: false, error: null }
  )

  // Stati locali per gestire form e visibilità password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Hook per la navigazione
  const navigate = useNavigate()

  // Funzione per mostrare/nascondere la password
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // Gestore del login
  const handleLogin = async () => {
    try {
      // Token hardcoded per demo
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'
      
      // Salva il token e naviga al profilo
      authService.setToken(token)
      navigate('/profile/me')
    } catch (error) {
      console.error('Errore login:', error)
    }
  }

  // Rendering del componente
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Accedi</h2>
        <p>Resta al passo con il tuo mondo professionale</p>

        {/* Campo input email */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Email o telefono"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo input password con toggle visibilità */}
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? 'Nascondi' : 'Mostra'}
          </span>
        </div>

        {/* Pulsante login */}
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Caricamento...' : 'Accedi'}
        </button>

        {/* Messaggio di errore */}
        {error && <p className="error-message">{error}</p>}

        {/* Separatore */}
        <div className="separator">
          <span>oppure</span>
        </div>

        {/* Pulsanti per login social */}
        <div className="social-buttons">
          <button className="social-button google">Continue with Google</button>
          <button className="social-button microsoft">
            Accedi con Microsoft
          </button>
          <button className="social-button apple">Accedi con Apple</button>
        </div>

        {/* Note legali e privacy */}
        <p className="terms">
          Cliccando su "Continua", accetti il{' '}
          <a href="#">Contratto di licenza</a>,{' '}
          <a href="#">l'Informativa sulla privacy</a> e{' '}
          <a href="#">l'Informativa sui cookie</a> di LinkedIn.
        </p>
      </div>
    </div>
  )
}

export default Login
