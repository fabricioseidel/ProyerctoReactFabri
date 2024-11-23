import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/Notfound";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./Context/CartContex";

function App() {
  const { user, token, logout, login } = useContext(UserContext);
  const handleLogin = (userInfo, authToken) => {
    login(userInfo, authToken);
  };
  return (
    <CartProvider>
      <Router>
        <Navbar user={user} onLogout={logout} /> <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/profile"
              element={
                token ? (
                  <Profile user={user} onLogout={logout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />{" "}
      </Router>
    </CartProvider>
  );
}

export default App;
