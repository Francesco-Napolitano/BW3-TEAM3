import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa"; // Icona camera

const HorizontalProfileCard = ({ name, title, area, image }) => {
  const [bannerImage, setBannerImage] = useState(null); // Stato per lo sfondo

  // Gestore per il cambio immagine di sfondo
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target.result); // Imposta l'immagine come sfondo
      };
      reader.readAsDataURL(file);
    } else {
      alert("Seleziona un file immagine valido!"); // Validazione
    }
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4">
        {/* Header con Sfondo modificabile */}
        <div
          className="position-relative rounded-top banner"
          style={{
            background: bannerImage
              ? `url(${bannerImage}) center/cover no-repeat`
              : "linear-gradient(90deg, #E5E5E5, #F1F1F1)", // Sfondo immagine o gradient
            height: "190px",
          }}
        >
          {/* Cerchiolino per cambiare immagine di sfondo */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("bannerInput").click()} // Attiva il file picker sfondo
          >
            <FaCamera color="#000" />
          </div>
          {/* Input invisibile per sfondo */}
          <input
            type="file"
            id="bannerInput"
            style={{ display: "none" }}
            accept="image/jpeg, image/png"
            onChange={handleBannerChange}
          />

          {/* Immagine Profilo */}
          <div
            style={{
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              position: "absolute",
              left: "30px",
              bottom: "-60px",
              overflow: "hidden",
              border: "4px solid #fff",
            }}
          >
            <div
              className="bg-secondary d-flex justify-content-center align-items-center text-white fw-bold fs-1"
              style={{ height: "100%" }}
            >
              {name ? name.charAt(0) : "N"}
            </div>
          </div>
        </div>

        {/* Corpo principale */}
        <Card.Body className="px-4 pt-5 pb-0">
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="fw-bold mb-0">{name || "Nome Utente"}</h3>
              <p className="text-muted mb-1">{title || "Titolo Professionale"}</p>
              <p className="text-muted small mb-3">{area || "Area Geografica"}</p>
            </Col>
            <Col md={4} className="text-md-end text-start">
              <div className="text-primary fw-bold">Webdevelopmentindia</div>
            </Col>
          </Row>
        </Card.Body>

        {/* Pulsanti */}
        <div className="px-4 pb-3">
          <div className="d-flex flex-wrap gap-2">
            <Button variant="success" className="fw-bold">
              Open to
            </Button>
            <Button variant="outline-secondary">Add section</Button>
            <Button variant="light">More</Button>
          </div>
        </div>

        {/* Footer */}
        <Card.Footer className="bg-white border-0 px-4">
          <small className="text-muted">
            Open to work{" "}
            <a href="#details" className="text-decoration-none">
              See all details
            </a>
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default HorizontalProfileCard;
