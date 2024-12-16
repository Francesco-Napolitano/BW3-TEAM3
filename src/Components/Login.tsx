import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'
import { RootState, AppDispatch } from '../store/store'
import '..styles/Login.css'

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLogin = () => {
    dispatch(login(email, password))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Accedi</h2>
        <p>Resta al passo con il tuo mondo professionale</p>

        {/* Email Input */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Email o telefono"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
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

        {/* Login Button */}
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Caricamento...' : 'Accedi'}
        </button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        <div className="separator">
          <span>oppure</span>
        </div>

        {/* Social Login Buttons */}
        <div className="social-buttons">
          <button className="social-button google">Continue with Google</button>
          <button className="social-button microsoft">
            Accedi con Microsoft
          </button>
          <button className="social-button apple">Accedi con Apple</button>
        </div>

        {/* Privacy Links */}
        <p className="terms">
          Cliccando su “Continua”, accetti il{' '}
          <a href="#">Contratto di licenza</a>,{' '}
          <a href="#">l'Informativa sulla privacy</a> e{' '}
          <a href="#">l'Informativa sui cookie</a> di LinkedIn.
        </p>
      </div>
    </div>
  )
}

export default Login
