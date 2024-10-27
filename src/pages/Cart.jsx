import React from "react";
import { useCart } from "../Context/CartContex";

const Cart = () => {
  const { cart, addToCart, removeFromCart, calculateTotal } = useCart();
  const total = calculateTotal();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu Carrito</h2>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="row mb-4 p-3 border rounded cart-item">
            <div className="col-md-3">
              <img src={item.img} alt={item.name} className="img-fluid" />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <h5>{item.name}</h5>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price.toLocaleString("es-ES")}</p>
              <p>
                Total: ${(item.price * item.quantity).toLocaleString("es-ES")}
              </p>
            </div>
            <div className="col-md-3 d-flex flex-column justify-content-between align-items-end">
              <button
                onClick={() => addToCart(item)}
                className="btn btn-primary me-2"
              >
                Agregar
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes productos en tu carrito.</p>
      )}
      <hr />
      <h4>Total: ${calculateTotal().toLocaleString("es-ES")}</h4>
      <button className="btn btn-primary">Pagar Total</button>
    </div>
  );
};

export default Cart;
