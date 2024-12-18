import { Container } from 'react-bootstrap'
import '../styles/ErrorPage.css'

const ErrorPage = () => {
  return (
    <Container className="error-page">
      <h1>404 Error</h1>
      <p>Page not found</p>
    </Container>
  )
}

export default ErrorPage
