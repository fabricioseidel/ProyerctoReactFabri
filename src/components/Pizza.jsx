import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchPizza = async () => {
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
    <div className="container">
      <h1>{pizza.name}</h1>
      <img
        src={pizza.image}
        alt={`Imagen de ${pizza.name}`}
        className="pizza-img"
      />
      <p className="pizza-price">${pizza.price}</p>
      <p>Ingredientes:</p>
      <ul className="pizza-ingredients-list">
        {pizza.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <Button variant="dark" className="pizza-btn">
        Añadir al carrito
      </Button>{" "}
      {/* Botón de Bootstrap */}
    </div>
  );
};

export default Pizza;
