import { Card, Col, Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SavedPosts = () => {
  const savedPost = useSelector((state) => {
    console.log(state)
    return state.savedPost.list
  })
  console.log(savedPost)
  return (
    <Container
      className="d-flex flex-wrap justify-content-center"
      style={{ paddingBottom: '2rem', paddingTop: '6rem' }}
    >
      {savedPost.length > 0 ? (
        savedPost.map((post) => (
          <Col
            xs={11}
            sm={5}
            md={5}
            lg={3}
            xxl={2}
            className="mb-4 mx-1"
            key={post._id}
          >
            <Card className="h-100 w-100 shadow-sm p-3">
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
                    className="bi bi-heart"
                    onClick={(e) => {
                      e.target.classList.toggle('bi-heart-fill')
                      e.target.classList.toggle('bi-heart')
                    }}
                  ></i>
                </div>
                <div className="d-flex align-items-baseline gap-1">
                  <p className="m-0">Salva</p>
                  <i
                    className="bi bi-bookmark-fill"
                    onClick={(e) => {
                      e.target.classList.toggle('bi-bookmark')
                      e.target.classList.toggle('bi-bookmark-fill')
                    }}
                  ></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))
      ) : (
        <div
          className="d-flex align-items-center alert alert-warning mb-5 mt-2"
          role="alert"
        >
          <p>
            Non ci sono elementi salvati al momento. Se desideri salvare un
            post, puoi farlo cliccando sul pulsante &quot;Salva&quot; presente
            in basso a destra di ogni post.
          </p>
        </div>
      )}
    </Container>
  )
}
export default SavedPosts
