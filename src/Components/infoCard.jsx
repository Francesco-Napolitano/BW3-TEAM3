import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const HorizontalProfileCard = ({ name, title, area, image, id }) => {
  const [bannerImage, setBannerImage] = useState(null);

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
    <Container className="py-4" style={{ maxWidth: "900px" }}>
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
          <h4 className="fw-bold mb-1">{name || "MATTEO DI LORENZO"}</h4>
          <span
            style={{
              fontSize: "14px",
              color: "#666",
            }}
          >
            Studente presso Università degli Studi di Pavia
          </span>
          <p
            style={{
              color: "#666",
              fontSize: "12px",
            }}
            className="mt-2"
          >
            Pavia • <span style={{ color: "#0a66c2", cursor: "pointer" }}>Informazioni di contatto</span>
          </p>

          {/* Bottoni */}
          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" style={{ borderRadius: "20px" }}>
              Disponibile per
            </Button>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", fontWeight: "bold" }}
            >
              Aggiungi sezione del profilo
            </Button>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", fontWeight: "bold" }}
            >
              Migliora profilo
            </Button>
            <Button variant="light" style={{ borderRadius: "20px" }}>
              Risorse
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HorizontalProfileCard;
