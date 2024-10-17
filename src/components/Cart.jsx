import React from "react";

const Cart = ({ cart, incrementQuantity, decrementQuantity }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
              <div>
                <h5>{item.name}</h5>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price.toLocaleString("es-ES")}</p>
                <p>
                  Total: ${(item.price * item.quantity).toLocaleString("es-ES")}
                </p>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column justify-content-between align-items-end">
              <div>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="btn btn-primary me-2"
                >
                  +
                </button>

                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="btn btn-secondary"
                >
                  -
                </button>
              </div>
              <button className="btn btn-success mt-2">&#128179; Pagar</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Tu carrito está vacío</p>
      )}

      {cart.length > 0 && (
        <div className="mt-4 text-end">
          <h4>
            Total del carrito: ${calculateTotal().toLocaleString("es-ES")}
          </h4>
          <button className="btn btn-success btn-lg mt-3">
            &#128179; Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
