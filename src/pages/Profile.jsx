import React from "react";

const Profile = ({ user, onLogout }) => {
  return (
    <div className="container mt-4">
      <h1>Perfil de Usuario</h1>
      {user ? (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button className="btn btn-danger" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p>No hay usuario conectado.</p>
      )}
    </div>
  );
};

export default Profile;
