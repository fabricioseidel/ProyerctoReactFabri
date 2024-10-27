import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContex";
import {
  FaHome,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
} from "react-icons/fa";

const NavbarComponent = ({ user, onLogout }) => {
  const { calculateTotal } = useCart();
  const totalAmount = calculateTotal();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Michi Pizzeria
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link btn btn-outline-success me-2" to="/">
              <FaHome /> Home
            </Link>
            {user ? (
              <>
                <Link
                  className="nav-link btn btn-outline-success me-2"
                  to="/profile"
                >
                  <FaUser /> Profile
                </Link>
                <button
                  className="nav-link btn btn-outline-success me-2"
                  onClick={onLogout}
                >
                  <FaSignInAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="nav-link btn btn-outline-success me-2"
                  to="/login"
                >
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  className="nav-link btn btn-outline-success me-2"
                  to="/register"
                >
                  <FaUserPlus /> Register
                </Link>
              </>
            )}
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link btn btn-outline-success" to="/cart">
              <FaShoppingCart /> 🛒 Total: $
              {totalAmount.toLocaleString() || "0"}{" "}
              <button className="btn btn-primary">Pagar</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
