import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spinner, Modal, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const data = await response.json();
        setPizzas(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleShow = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleClose = () => {
    setSelectedPizza(null);
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }
  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Pizzas disponibles</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {pizzas.map((pizza) => (
          <Col key={pizza.id}>
            <Card>
              <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>Precio: ${pizza.price}</Card.Text>
                <button className="btn btn-dark mt-2">Añadir al carrito</button>
                <button
                  className="btn btn-link p-0"
                  onClick={() => handleShow(pizza)}
                >
                  Ver más
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={!!selectedPizza} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPizza?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedPizza?.desc}</p>
          <h5>Ingredientes:</h5>
          <ul>
            {selectedPizza?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>
            <strong>Precio: ${selectedPizza?.price}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
