import React, { useState, useEffect, useRef } from "react";
import {
  getFolder,
  createFolder,
  deleteFolder,
  deleteFile,
  getFileInfo,
  renameItem,
  copyItem,
  moveItem,
  downloadFile,
  uploadFile,
} from "../api";
import Folder from "../components/folder";
import File from "../components/file";
import Breadcrumbs from "../components/breadcrumbs";

export default function Home({ user }) {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState(null);
  const [info, setInfo] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const fileInputRef = useRef(null);

  const refresh = async () => {
    try {
      const data = await getFolder(user.id, currentPath);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    refresh();
    setSelected(null);
  }, [currentPath]);

  const handleCreate = async () => {
    const name = prompt("Folder Name:");
    if (name) {
      await createFolder(user.id, currentPath, name);
      refresh();
    }
  };
  const handleDelete = async () => {
    if (!selected || !window.confirm(`Delete ${selected.name}?`)) return;
    const path = currentPath
      ? `${currentPath}/${selected.name}`
      : selected.name;
    selected.type === "folder"
      ? await deleteFolder(user.id, path)
      : await deleteFile(user.id, path);
    refresh();
  };
  const handleRename = async () => {
    const name = prompt("New Name:", selected?.name);
    if (!name || !selected) return;
    const path = currentPath
      ? `${currentPath}/${selected.name}`
      : selected.name;
    await renameItem(user.id, path, name);
    refresh();
  };
  const handleCopyMove = (type) => {
    if (!selected) return;
    setClipboard({
      type,
      path: currentPath ? `${currentPath}/${selected.name}` : selected.name,
      name: selected.name,
    });
  };
  const handlePaste = async () => {
    if (!clipboard) return;
    clipboard.type === "copy"
      ? await copyItem(user.id, clipboard.path, currentPath)
      : await moveItem(user.id, clipboard.path, currentPath);
    setClipboard(null);
    refresh();
  };
  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      await uploadFile(user.id, currentPath, e.target.files[0]);
      refresh();
    }
    e.target.value = null;
  };
  const handleDownload = async () => {
    if (selected?.type === "file") {
      const path = currentPath
        ? `${currentPath}/${selected.name}`
        : selected.name;
      await downloadFile(user.id, path, selected.name);
    }
  };
  const handleInfo = async () => {
    if (selected?.type === "file") {
      const path = currentPath
        ? `${currentPath}/${selected.name}`
        : selected.name;
      setInfo(await getFileInfo(user.id, path));
    }
  };

  return (
    <div
      style={{ padding: 20, fontFamily: "sans-serif" }}
      onClick={() => setSelected(null)}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            flexGrow: 1,
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          <Breadcrumbs currentPath={currentPath} onNavigate={setCurrentPath} />
        </div>
        <button onClick={() => fileInputRef.current.click()} style={btnStyle}>
          ☁ Upload
        </button>
        <input type="file" ref={fileInputRef} hidden onChange={handleUpload} />
        <button onClick={handleCreate} style={btnStyle}>
          + Folder
        </button>
      </div>

      <div
        style={{
          padding: 10,
          background: "#f5f5f5",
          borderRadius: 8,
          marginBottom: 20,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        {clipboard && (
          <button
            onClick={handlePaste}
            style={{ ...btnStyle, border: "2px solid orange" }}
          >
            📋 Paste {clipboard.name}
          </button>
        )}
        {selected ? (
          <>
            <span style={{ fontWeight: "bold" }}>{selected.name}</span>
            <button onClick={handleRename} style={btnStyle}>
              Rename
            </button>
            <button onClick={() => handleCopyMove("copy")} style={btnStyle}>
              Copy
            </button>
            <button onClick={() => handleCopyMove("move")} style={btnStyle}>
              Cut
            </button>
            <button
              onClick={handleDelete}
              style={{ ...btnStyle, color: "red" }}
            >
              Delete
            </button>
            {selected.type === "file" && (
              <>
                <button onClick={handleInfo} style={btnStyle}>
                  Info
                </button>
                <button onClick={handleDownload} style={btnStyle}>
                  Download
                </button>
              </>
            )}
          </>
        ) : (
          <span style={{ color: "#999" }}>Select item for actions</span>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((i) =>
          i.type === "folder" ? (
            <Folder
              key={i.name}
              item={i}
              selected={selected?.name === i.name}
              onSelect={setSelected}
              onNavigate={(n) =>
                setCurrentPath(currentPath ? `${currentPath}/${n}` : n)
              }
            />
          ) : (
            <File
              key={i.name}
              item={i}
              selected={selected?.name === i.name}
              onSelect={setSelected}
            />
          )
        )}
      </div>

      {info && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "white",
            padding: 30,
            border: "1px solid #000",
          }}
        >
          <h3>Info</h3>
          <p>Size: {info.size}</p>
          <p>Created: {info.created}</p>
          <button onClick={() => setInfo(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
const btnStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: 4,
  border: "1px solid #ccc",
};
