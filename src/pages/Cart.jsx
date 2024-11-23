import React, { useContext, useState } from "react";
import { useCart } from "../Context/CartContex";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, calculateTotal, clearCart } =
    useCart();
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const total = calculateTotal();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidTotal, setPaidTotal] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleRealPayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const cartData = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }));

      const response = await fetch("/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cartData,
          totalAmount: total,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaidTotal(total);
        setPaymentSuccess(true);
        setPaymentCompleted(true);
        clearCart(total);
      } else {
        alert(
          `Error en el pago: ${data.message || "Hubo un error inesperado."}`
        );
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      alert("Hubo un problema con el proceso de pago.");
    }
  };

  const handleSimulatedPayment = () => {
    setPaidTotal(total);
    setPaymentSuccess(true);
    setPaymentCompleted(true);
    clearCart(total);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu Carrito</h2>

      {paymentSuccess && (
        <>
          <div className="alert alert-success">Pago realizado con éxito</div>
          <div className="alert alert-info mt-3">
            Este es el total de tu boleta: ${paidTotal.toLocaleString("es-ES")}
            <br />
            <strong>¡GRACIAS, VUELVA PRONTO!</strong>
          </div>
        </>
      )}

      {!paymentSuccess && cart.length > 0 ? (
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
      ) : !paymentSuccess ? (
        <p>No tienes productos en tu carrito.</p>
      ) : null}

      {!paymentSuccess && (
        <>
          <hr />
          <h4>Total: ${total.toLocaleString("es-ES")}</h4>
          {token ? (
            <>
              <button className="btn btn-primary" onClick={handleRealPayment}>
                Pago con consulta a la api
              </button>
              <button
                className="btn btn-success mt-3"
                onClick={handleSimulatedPayment}
              >
                Compra Siempre Aprobada
              </button>
            </>
          ) : (
            <button
              className="btn btn-warning mt-3"
              onClick={() => navigate("/login")}
            >
              Inicia sesión para proceder con el pago
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
