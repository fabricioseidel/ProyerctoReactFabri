import React from "react";
import { Button, Card } from "react-bootstrap";

const CardPizza = ({ pizza, addToCart, removeFromCart }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={pizza.image}
        alt={pizza.name}
        className="img-fluid"
      />
      <Card.Body>
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text>Precio: ${pizza.price.toLocaleString("es-ES")}</Card.Text>

        <Card.Text>
          🍕 Ingredientes:{" "}
          {pizza.ingredients.map((ingredient, index) => (
            <span key={index}>
              {ingredient}
              {index < pizza.ingredients.length - 1 ? ", " : ""}
            </span>
          ))}
        </Card.Text>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="danger" onClick={() => removeFromCart(pizza.id)}>
            🗑 Eliminar
          </Button>
          <Button variant="dark" onClick={() => addToCart(pizza)}>
            🛒 Añadir
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
