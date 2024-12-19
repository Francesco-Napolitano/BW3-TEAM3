import { Alert, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from 'react-icons/fa'; // Importiamo l'icona del cestino
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE';
  const commentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGUyYThhZDEyOTAwMTU4NzZiYzkiLCJpYXQiOjE3MzQ2MDc0OTAsImV4cCI6MTczNTgxNzA5MH0.c1IJWoEkt9oiMUS4vP0pazfhoEO_I-Zo6A4aA7FHNjw';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [currentPostComments, setCurrentPostComments] = useState([]); // Stato per i commenti del post
  const [newComments, setNewComments] = useState({}); // Stato per i commenti dei singoli post
  const [link, setLink] = useState(''); // Stato per il link dell'immagine
  const [description, setDescription] = useState(''); // Stato per la descrizione del post

  const handleClosePostModal = () => setShowPostModal(false);
  const handleShowPostModal = () => setShowPostModal(true);
  const handleCloseCommentsModal = () => setShowCommentsModal(false);

  const getPosts = () => {
    console.log('Fetching posts...');
    fetch('https://striveschool-api.herokuapp.com/api/posts/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('Response:', res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Errore nel recupero dei post');
        }
      })
      .then((data) => {
        console.log('Posts:', data);
        const latestPosts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 50);
        setPosts(latestPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Errore:', error);
        setError(true);
      });
  };

  const savePost = (e) => {
    e.preventDefault();
    const newPost = { image: link, text: description };

    fetch('https://striveschool-api.herokuapp.com/api/posts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Errore nel salvataggio del post');
        }
      })
      .then((data) => {
        console.log('Post salvato:', data);
        getPosts();
      })
      .catch((error) => {
        console.error('Errore:', error);
        setError(true);
      });
  };

  const getComments = (postId) => {
    console.log(`Fetching comments for post ID: ${postId}`);
    fetch(`https://striveschool-api.herokuapp.com/api/comments?elementId=${postId}`, {
      headers: {
        Authorization: `Bearer ${commentToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentPostComments(data);
        setShowCommentsModal(true); // Mostra il modal dei commenti
      })
      .catch((error) => console.error('Errore nel recupero dei commenti:', error));
  };

  const addComment = (postId) => {
    const comment = newComments[postId]; // Ottieni il commento per il post specifico
    if (comment && comment.trim() !== '') {
      const commentData = {
        comment,
        rate: 5, // Rate a valore fisso
        elementId: postId,
      };

      fetch('https://striveschool-api.herokuapp.com/api/comments/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${commentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
        .then((res) => res.json())
        .then((savedComment) => {
          // Aggiungi il nuovo commento in cima alla lista (come primo)
          setCurrentPostComments((prevComments) => [savedComment, ...prevComments]);

          // Resetta il commento per il post corrente
          setNewComments((prevComments) => ({
            ...prevComments,
            [postId]: '',
          }));

          // Riapri il modal per assicurarti che i commenti siano aggiornati
          setShowCommentsModal(true);
        })
        .catch((error) => console.error("Errore nell'aggiunta del commento:", error));
    }
  };

  const deleteComment = (commentId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${commentToken}`,
      },
    })
      .then(() => {
        setCurrentPostComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => console.error("Errore nell'eliminazione del commento:", error));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const dispatch = useDispatch();

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <Form className="d-flex justify-content-end" onSubmit={savePost}>
            <Button variant="primary" onClick={handleShowPostModal}>
              Crea un nuovo post
            </Button>

            <Modal show={showPostModal} onHide={handleClosePostModal}>
              <Modal.Header closeButton>
                <Modal.Title>Dai sfogo alla fantasia!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Immagine</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="mb-2"
                  placeholder="Link"
                  onChange={(e) => setLink(e.target.value)}
                />
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Un bel post"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePostModal}>
                  Chiudi
                </Button>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleClosePostModal();
                    savePost(e);
                  }}
                >
                  Condividi
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
          <h1 className="text-center my-3">Ultimi Post</h1>
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
            <Row className="g-3">
              {posts
                .filter((post) =>
                  post.text.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <Col key={post._id} xs={12} sm={6}>
                    <Card className="h-100 w-100 shadow-sm p-2">
                      <Card.Img
                        variant="top"
                        src={post.image || 'https://via.placeholder.com/150'}
                        style={{
                          height: '10em',
                          objectFit: 'contain',
                        }}
                        className="rounded-3"
                      />
                      <Card.Body>
                        <Card.Title>
                          {post.username.charAt(0).toUpperCase() + post.username.slice(1)}
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
                              e.target.classList.toggle('bi-heart-fill');
                              e.target.classList.toggle('bi-heart');
                            }}
                          ></i>
                        </div>
                        <div className="d-flex align-items-baseline gap-1">
                          <p className="m-0">Salva</p>
                          <i
                            className={post.saved ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
                            onClick={(e) => {
                              if (e.target.classList.contains('bi-bookmark-fill')) {
                                e.target.classList.toggle('bi-bookmark-fill');
                                e.target.classList.toggle('bi-bookmark');
                                dispatch({
                                  type: 'REMOVE_POST',
                                  payload: post,
                                });
                              } else {
                                e.target.classList.toggle('bi-bookmark-fill');
                                e.target.classList.toggle('bi-bookmark');
                                dispatch({
                                  type: 'SAVE_POST',
                                  payload: post,
                                });
                              }
                            }}
                          ></i>
                        </div>
                      </Card.Footer>
                      <div className="mt-2">
                        <FormControl
                          className='mt-2'
                          placeholder="Aggiungi un commento..."
                          value={newComments[post._id] || ''}
                          onChange={(e) =>
                            setNewComments({ ...newComments, [post._id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addComment(post._id);
                            }
                          }}
                        />
                        <Button
                          variant="primary"
                          onClick={() => getComments(post._id)}
                          className="mt-3 mb-1 btn btn-primary text-white"
                        >
                          Visualizza Commenti
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Modal dei commenti */}
      <Modal show={showCommentsModal} onHide={handleCloseCommentsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPostComments.length === 0 && <p>Nessun commento disponibile.</p>}
          {currentPostComments.length > 0 &&
            currentPostComments.slice(0, 20).map((comment) => (
              <div key={comment._id} className="d-flex justify-content-between align-items-center">
                <p>{comment.comment}</p>
                <FaTrash style={{ cursor: 'pointer' }} onClick={() => deleteComment(comment._id)} />
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCommentsModal}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
