import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import "./App.css";
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function handleSaved() {
      const saved = localStorage.getItem("drive_user");
      if (saved) await setUser(JSON.parse(saved));
    }
    handleSaved();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("drive_user", JSON.stringify(user));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("drive_user");
  };

  return (
    <Router>
      {user && <NavBar username={user.username} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={user ? <Home user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
