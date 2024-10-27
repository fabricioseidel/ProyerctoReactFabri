import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
