import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.email);
        setToken(data.token);
        return { success: true };
      } else {
        throw new Error(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.email);
        setToken(data.token);
        return { success: true };
      } else {
        throw new Error(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.email);
        return { success: true, data };
      } else {
        throw new Error(data.message || "Error al obtener perfil");
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, register, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
