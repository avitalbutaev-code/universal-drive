import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ username, onLogout }) {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span>
          Hello, <b>{username}</b>
        </span>
        <button
          onClick={onLogout} //
        >
          Logout
        </button>
      </div>
      <Link to="/" style={{ marginRight: 20 }}>
        Home
      </Link>
      <Link to="/bin">Bin</Link>
    </nav>
  );
}
