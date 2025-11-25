import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function Register({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const user = await registerUser({ name: username, password });
      onLogin({
        id: user.id,
        username: user.name,
      });
      navigate("/drive");
    } catch (err) {
      const message = err.message.includes("Exists")
        ? "Username already taken."
        : "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Create Account 🚀</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <label htmlFor="username" style={labelStyle}>
          Username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#2196F3", textDecoration: "none" }}>
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
};

const formStyle = {
  padding: "30px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "350px",
  textAlign: "center",
};

const labelStyle = {
  display: "block",
  textAlign: "left",
  marginBottom: "5px",
  marginTop: "15px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px 0",
  display: "inline-block",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "#007bff",
  color: "white",
  padding: "12px 20px",
  margin: "15px 0 0 0",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const errorStyle = {
  color: "#f44336",
  backgroundColor: "#ffebee",
  padding: "10px",
  borderRadius: "4px",
  marginBottom: "15px",
  border: "1px solid #f44336",
  fontSize: "14px",
};
