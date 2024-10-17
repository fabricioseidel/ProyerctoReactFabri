import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((item) => item.id === pizza.id);

      if (pizzaInCart) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...pizza, quantity: 1, totalPrice: pizza.price },
        ];
      }
    });
  };

  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((item) => item.id === pizzaId);

      if (pizzaInCart.quantity === 1) {
        return prevCart.filter((item) => item.id !== pizzaId);
      } else {
        return prevCart.map((item) =>
          item.id === pizzaId
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price * (item.quantity - 1),
              }
            : item
        );
      }
    });
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <Home
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
