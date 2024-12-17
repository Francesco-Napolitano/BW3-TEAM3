import { Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  FormControl,
  InputGroup,
} from 'react-bootstrap'

const HomePage = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE'

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  const getPosts = () => {
    fetch('https://striveschool-api.herokuapp.com/api/posts/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then((data) => {
        const latestPosts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 50)
        setPosts(latestPosts)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Oh no...', error)
        setError(true)
      })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Ultimi Post</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Cerca post..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading && <Spinner animation="border" variant="info" />}
          {error && (
            <Alert variant="danger">
              Errore durante il caricamento dei dati
            </Alert>
          )}
          {!loading && !error && (
            <Row className="g-3 ">
              {posts
                .filter((post) =>
                  post.text.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <Col key={post._id} xs={12} sm={6}>
                    <Card className="h-100 w-100  shadow-sm p-2">
                      <Card.Img
                        variant="top"
                        src={
                          post.image ||
                          'https://play-lh.googleusercontent.com/iiIJq5JmLFYNI1bVz4IBHyoXs508JcEzHhOgau69bnveF9Wat51-ax9LMPVOlneKwqg'
                        }
                        style={{
                          height: '10em',
                          objectFit: 'contain',
                        }}
                        className="rounded-3"
                      />
                      <Card.Body>
                        <Card.Title>
                          {post.username.charAt(0).toUpperCase() +
                            post.username.slice(1)}
                        </Card.Title>
                        <Card.Text>{post.text}</Card.Text>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          Creato il: <br />
                          {post.createdAt.slice(0, 10)}
                        </ListGroup.Item>
                      </ListGroup>
                      <Card.Footer className="d-flex justify-content-between">
                        <div className="d-flex align-items-baseline gap-1">
                          <p className="m-0">Mi piace</p>
                          <i
                            className="bi bi-heart "
                            onClick={(e) => {
                              e.target.classList.toggle('bi-heart-fill')
                              e.target.classList.toggle('bi-heart')
                            }}
                          ></i>
                        </div>
                        <div className="d-flex align-items-baseline gap-1">
                          <p className="m-0">Salva</p>
                          <i
                            className="bi bi-bookmark"
                            onClick={(e) => {
                              e.target.classList.toggle('bi-bookmark-fill')
                              e.target.classList.toggle('bi-bookmark')
                            }}
                          ></i>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
