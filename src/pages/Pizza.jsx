import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Button, Card, ListGroup } from "react-bootstrap";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5001/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener la pizza");
        }
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!pizza) return <p>No se encontró la pizza.</p>;

  return (
    <div className="container mt-1">
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={pizza.img}
          alt={`Imagen de ${pizza.name}`}
        />
        <Card.Body>
          <Card.Title className="text-center text-danger">
            {pizza.name}
          </Card.Title>
          <Card.Text
            className="text-center text-success"
            style={{ fontSize: "1.5rem" }}
          >
            <strong>${pizza.price}</strong>
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Ingredientes:</strong>
              <ul>
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>{pizza.desc}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button variant="dark" onClick={() => agregarAlCarrito(pizza)}>
            Añadir al carrito
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Pizza;
