import React from "react";
export default function Breadcrumbs({ currentPath, onNavigate }) {
  const items = [{ name: "Home", path: "" }];
  if (currentPath) {
    const parts = currentPath.split("/");
    parts.forEach((part, index) =>
      items.push({ name: part, path: parts.slice(0, index + 1).join("/") })
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
      {items.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <span style={{ margin: "0 5px" }}>/</span>}
          <span
            onClick={() => onNavigate(crumb.path)}
            style={{
              cursor: "pointer",
              color: index === items.length - 1 ? "black" : "blue",
              fontWeight: index === items.length - 1 ? "bold" : "normal",
            }}
          >
            {crumb.name}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
