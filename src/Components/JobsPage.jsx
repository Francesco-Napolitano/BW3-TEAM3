import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Badge } from 'react-bootstrap';
import '../styles/JobsPage.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  
  const fetchJobs = async (searchQuery = '', category = '', limit = 10) => {
    setLoading(true);
    try {
      
      const url = new URL('https://strive-benchmark.herokuapp.com/api/jobs');
      if (searchQuery) url.searchParams.append('search', searchQuery);
      if (category) url.searchParams.append('category', category);
      if (category) url.searchParams.append('limit', limit); 

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.data);

        
        const uniqueCategories = [
          ...new Set(data.data.map((job) => job.category)),
        ];
        setCategories(uniqueCategories);
      } else {
        console.error('Errore nel recupero dei lavori');
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchJobs(); 
  }, []);

 
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchJobs(query, category, 10); 
  };

  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(query, selectedCategory, 10); 
    setQuery(''); 
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col className='mt-5'>
          <h1 className="text-center">Offerte di Lavoro</h1>
          <p className="text-center text-muted">
            Esplora migliaia di offerte di lavoro e trova il tuo prossimo impiego!
          </p>
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
       
        <Col md={8}>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Cerca un lavoro per titolo, azienda o parola chiave"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="primary" className="ms-2">
              Cerca
            </Button>
          </Form>
        </Col>

        
        <Col md={4} className="mt-3 mt-md-0">
          <Form.Select
            aria-label="Filtra per categoria"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Tutte le categorie</option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        
        {loading ? (
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
            <p className="mt-3">Stiamo cercando le migliori offerte per te...</p>
          </Col>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Col md={6} lg={4} className="mb-3" key={job._id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-primary">{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company_name}
                  </Card.Subtitle>
                  <Badge bg="info" className="mb-2">
                    {job.category}
                  </Badge>
                </Card.Body>

                <Card.Footer className="text-center">
                  <Card.Link href={job.url} target="_blank">
                    Visualizza dettagli
                  </Card.Link>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>Nessun risultato trovato. Prova a cercare un'altra parola chiave o categoria.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default JobsPage;
