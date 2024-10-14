import React, { useState } from "react";
// import "./App.css";
import Home from "./components/Home";
import Cart from "./components/Cart";
import pizzas from "./components/Pizzas";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizzaId) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((pizza) => pizza.id === pizzaId);
      if (pizzaInCart) {
        return prevCart.map((pizza) =>
          pizza.id === pizzaId
            ? { ...pizza, quantity: pizza.quantity + 1 }
            : pizza
        );
      } else {
        const pizzaToAdd = pizzas.find((pizza) => pizza.id === pizzaId);
        return pizzaToAdd
          ? [...prevCart, { ...pizzaToAdd, quantity: 1 }]
          : prevCart;
      }
    });
  };

  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((pizza) => pizza.id === pizzaId);
      if (pizzaInCart) {
        if (pizzaInCart.quantity === 1) {
          return prevCart.filter((pizza) => pizza.id !== pizzaId);
        } else {
          return prevCart.map((pizza) =>
            pizza.id === pizzaId
              ? { ...pizza, quantity: pizza.quantity - 1 }
              : pizza
          );
        }
      }
      return prevCart;
    });
  };

  const totalAmount = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.quantity,
    0
  );

  return (
    <>
      <Navbar totalAmount={totalAmount} />
      <Header />
      <div className="container">
        <div className="row">
          <Home addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
      </div>

      <Cart
        cart={cart}
        incrementQuantity={addToCart}
        decrementQuantity={removeFromCart}
      />
      <Footer />
    </>
  );
};

export default App;
