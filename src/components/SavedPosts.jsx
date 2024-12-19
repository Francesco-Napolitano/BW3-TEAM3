import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const savedPosts = () => {
  const post = useSelector((state) => state.savedPosts)
  return (
    <Container fluid>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  )
}
export default savedPosts
