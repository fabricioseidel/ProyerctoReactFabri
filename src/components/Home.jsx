import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("https://example.com/api/pizzas"); // URL de tu API de pizzas
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
              <Card.Img variant="top" src={pizza.image} alt={pizza.name} />
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>{pizza.description}</Card.Text>
                <Card.Text>Precio: ${pizza.price}</Card.Text>
                <button className="btn btn-dark">Añadir al carrito</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
