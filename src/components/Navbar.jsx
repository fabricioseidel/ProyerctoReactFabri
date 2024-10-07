import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";

const NavbarComponent = () => {
  const total = 25000;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const token = false;

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Michi Pizzeria
          </a>
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
              <a
                className="nav-link btn btn-outline-success me-2"
                aria-current="page"
                href="#"
              >
                Home 🍕
              </a>
              {token ? (
                <>
                  <a className="nav-link btn btn-outline-success me-2" href="#">
                    Profile 👨‍💻
                  </a>
                  <a className="nav-link btn btn-outline-success me-2" href="#">
                    Logout 🔐
                  </a>
                </>
              ) : (
                <>
                  <Button
                    className="nav-link btn btn-outline-success me-2"
                    onClick={handleShowLogin}
                  >
                    Login 🚪
                  </Button>
                  <Button
                    className="nav-link btn btn-outline-success me-2"
                    onClick={handleShowRegister}
                  >
                    Register 🔐
                  </Button>
                </>
              )}
            </div>
            <div className="navbar-nav ms-auto">
              <a className="nav-link btn btn-outline-success" href="#">
                🛒 Total: ${total.toLocaleString()}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Formulario de Login</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseLogin}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Formulario de Registro</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
