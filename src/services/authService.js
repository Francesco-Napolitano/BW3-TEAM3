// Chiave utilizzata per memorizzare il token nel sessionStorage
const TOKEN_KEY = 'user_token'

// Servizio di autenticazione che gestisce il token JWT
export const authService = {
  // Salva il token nel sessionStorage
  setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token)
  },

  // Recupera il token dal sessionStorage
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
  },

  // Rimuove il token dal sessionStorage durante il logout
  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY)
  },

  // Verifica se l'utente è autenticato controllando la presenza del token
  // Ritorna true se il token esiste, false altrimenti
  isAuthenticated() {
    return !!this.getToken()
  }
} 