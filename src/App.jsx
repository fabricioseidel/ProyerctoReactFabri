import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

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
      if (pizzaInCart) {
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
      }
      return prevCart;
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Router>
      <Navbar totalAmount={totalAmount} user={user} onLogout={handleLogout} />
      <Header />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />{" "}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                incrementQuantity={addToCart}
                decrementQuantity={removeFromCart}
              />
            }
          />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route
            path="/profile"
            element={<Profile user={user} onLogout={handleLogout} />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
