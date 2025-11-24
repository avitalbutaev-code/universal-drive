// src/components/ActionsWindow.js
import React from "react";

export default function ActionsWindow({ onClose, actions }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: 100,
        backgroundColor: "#fff",
        padding: 20,
        border: "1px solid #ccc",
        zIndex: 1000,
      }}
    >
      {actions.map((action) => (
        <div
          key={action.name}
          style={{ marginBottom: 10, cursor: "pointer" }}
          onClick={() => {
            action.onClick();
            onClose();
          }}
        >
          {action.name}
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
