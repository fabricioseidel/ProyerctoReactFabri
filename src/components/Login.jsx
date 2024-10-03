import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Todos los campos son obligatorios.");
      console.log("//error// Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener un minimo de 6 caracteres");
      console.log(
        "//error// La contraseña debe tener un minimo de 6 caracteres"
      );
      return;
    }
    alert("Todo correcto por acá");
    console.log("Datos ingresados de manera correcta");

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Inicia sesión</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
