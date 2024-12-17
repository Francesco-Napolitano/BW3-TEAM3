import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Col, Modal, Row } from "react-bootstrap";
//import { addPost } from "../../redux/actions/feedActions";
//import { store } from "../../redux/store/store";

export const Postmaker = () => {
  const [Photo, setPhoto] = useState(false);
  const [Video, setVideo] = useState(false);
  const [Event, setEvent] = useState(false);
  const [Article, setArticle] = useState(false);
  const [show, setShow] = useState(false);
  const [textPost, setTextPost] = useState("");

  const myProfile = useSelector((state) => state.profile.me);

  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(!show);

  const dispatch = store.dispatch;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { text: textPost };
    dispatch(addPost(newPost));
    setShow(false);
    setTextPost("");
  };

  return (
    <div className="sectionContainer postMaker">
      <Col xs={12}>
        <Row>
          <Col xs={2}>
            <img
              src={myProfile?.image}
              alt="avatar"
              className="postProfileImage"
            />
          </Col>
          <Col>
            <button onClick={handleShow} className="bigButton">
              <span className="ms-2">Avvia un post</span>
            </button>
          </Col>
        </Row>
        <Row className="btnSection">
          <Col>
            <button
              onClick={() => {
                setPhoto(!Photo);
              }}
            >
              <i className="bi bi-image"></i> <span>Foto</span>
            </button>
          </Col>
          <Col>
            <button
              onClick={() => {
                setVideo(!Video);
              }}
            >
              <i className="bi bi-play-btn-fill"></i> <span>Video</span>
            </button>
          </Col>
          <Col>
            <button
              onClick={() => {
                setEvent(!Event);
              }}
            >
              <i className="bi bi-calendar-date"></i> <span>Evento</span>
            </button>
          </Col>
          <Col>
            <button
              onClick={() => {
                setArticle(!Article);
              }}
            >
              <i className="bi bi-journal-text"></i>
              <span>Articolo</span>
            </button>
          </Col>
        </Row>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="linkBehave">
            <Col xs={2}>
              <img
                src={myProfile?.image}
                alt="avatar"
                className="postProfileImage"
              />
            </Col>
            <Col>
              <p>
                {myProfile?.name} {myProfile?.surname}
              </p>
              <p className="text-muted">
                <small>Pubblica: Chiunque</small>
              </p>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Scrivi qualcosa!</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={textPost}
              onChange={(e) => setTextPost(e.target.value)}
              placeholder="Inserisci qui il tuo messaggio"
            />
            <button type="submit" className="btnBlue">
              Pubblica
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
