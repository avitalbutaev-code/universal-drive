import React from "react";

export default function File({ item, selected, onSelect, onDoubleClick }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(item);
      }}
      style={{
        width: 100,
        height: 100,
        margin: 10,
        padding: 10,
        borderRadius: 8,
        cursor: "pointer",
        textAlign: "center",
        border: selected ? "2px solid #2196F3" : "1px solid #ddd",
        background: selected ? "#e3f2fd" : "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 32 }}>📄</div>
      <div
        style={{
          fontSize: 12,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.name}
      </div>
    </div>
  );
}
