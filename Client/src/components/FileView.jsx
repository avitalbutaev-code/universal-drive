import React from "react";

export default function FileViewer({ file, onClose }) {
  if (!file) return null;

  return (
    <div style={viewerOverlayStyle}>
      <div style={viewerContentStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>Viewing: {file.fileName}</h3>
          <button onClick={onClose} style={closeButtonStyle}>
            X
          </button>
        </div>

        <textarea
          value={file.content}
          readOnly
          style={textareaStyle}
          placeholder="This file is empty or its contents cannot be displayed..."
        />
      </div>
    </div>
  );
}

const viewerOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const viewerContentStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "80%",
  maxWidth: "800px",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
};

const textareaStyle = {
  width: "100%",
  height: "400px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  resize: "none",
  fontSize: "14px",
  fontFamily: "monospace",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "#333",
  padding: "5px",
};
