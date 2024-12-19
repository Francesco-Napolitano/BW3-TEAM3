import React, { useState, useEffect } from "react";
import { Container, Card, Button, Dropdown, Modal, Form } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const HorizontalProfileCard = ({ name, title, area, image, id, informazioni }) => {
  const [bannerImage, setBannerImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); // Stato per il controllo del modale
  const [formData, setFormData] = useState({
    nome: name || "",
    bio: title || "",
    posizione: area || "",
  }); // Stato per i campi del form

  const menuOptions = [
    {
      label: "Lavoro a tempo pieno",
      description: "Sto cercando un lavoro a tempo pieno.",
    },
    {
      label: "Lavoro part-time",
      description: "Sono disponibile per un lavoro part-time.",
    },
    {
      label: "Collaborazioni",
      description: "Cerco collaborazioni a progetto.",
    },
  ];

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfileImage = async (newImage) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE";
    const endpoint = `https://striveschool-api.herokuapp.com/api/profile/${id}/picture`;

    try {
      const formData = new FormData();
      formData.append("profile", newImage);

      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Immagine aggiornata con successo!");
      } else {
        alert("Errore durante l'aggiornamento dell'immagine.");
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error);
      alert("Si è verificato un errore.");
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setBannerImage(result);
        updateProfileImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Seleziona un file immagine valido!");
    }
  };

  const handleSaveProfile = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE";
    const endpoint = "https://striveschool-api.herokuapp.com/api/profile/";

    try {
      const response = await axios.put(
        endpoint,
        {
          name: formData.nome,
          bio: formData.bio,
          area: formData.posizione,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        window.location.reload(true);
        handleCloseModal(); // Chiudi il modale dopo il salvataggio
      } else {
        alert("Errore durante l'aggiornamento del profilo.");
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo:", error);
      alert("Si è verificato un errore.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE";
      const endpoint = `https://striveschool-api.herokuapp.com/api/profile/me`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.image) {
          setBannerImage(response.data.image);
        }
      } catch (error) {
        console.error("Errore nel recupero del profilo:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container className="" style={{ padding: "0 !important" }}>
      <Card className="border-0 shadow-sm rounded-4 p-0">
        {/* Banner */}
        <div
          style={{
            background: bannerImage
              ? `url(${bannerImage}) center/cover no-repeat`
              : "#DDE0E4",
            height: "190px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              backgroundColor: "white",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("bannerInput").click()}
          >
            <FaCamera color="#333" />
          </div>
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
              backgroundColor: "#55627A",
              color: "white",
              fontSize: "48px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "4px solid white",
            }}
          >
            {name ? name.charAt(0) : "M"}
          </div>
        </div>

        {/* Contenuto Testuale */}
        <Card.Body className="pt-5 px-4">
          <h4 className="fw-bold mb-1 pt-3">{name || "MATTEO DI LORENZO"}</h4>
          <span
            style={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            {informazioni}
          </span>
          <p
            style={{
              color: "#666",
              fontSize: "12px",
            }}
            className="mt-2"
          >
            {area} •{" "}
            <span style={{ color: "#0a66c2", cursor: "pointer" }}>
              Informazioni di contatto
            </span>
          </p>

          {/* Bottoni */}
          <div className="d-flex gap-2 mt-3">
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                style={{ borderRadius: "20px" }}
              >
                Disponibile per
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {menuOptions.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  >
                    <strong>{option.label}</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      }}
                    >
                      {option.description}
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", fontWeight: "bold" }}
            >
              Aggiungi sezione del profilo
            </Button>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", fontWeight: "bold" }}
              onClick={handleOpenModal} // Apri il modale
            >
              Modifica profilo
            </Button>
            <Button variant="light" style={{ borderRadius: "20px" }}>
              Risorse
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modale */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder={informazioni}
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="posizione">
              <Form.Label>Posizione</Form.Label>
              <Form.Control
                type="text"
                placeholder={area}
                name="posizione"
                value={formData.posizione}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HorizontalProfileCard;
