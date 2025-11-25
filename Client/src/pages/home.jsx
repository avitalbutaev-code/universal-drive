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
  createFile,
  readFile,
} from "../api";
import Folder from "../components/folder";
import File from "../components/file";
import Breadcrumbs from "../components/breadcrumbs";
import FileViewer from "../components/FileView";

export default function Home({ user }) {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [selected, setSelected] = useState(null);
  const [info, setInfo] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const [viewerFile, setViewerFile] = useState(null);
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
    const name = prompt("Item Name (Folder or File):");
    if (!name) return;

    if (name.includes(".")) {
      await createFile(user.id, currentPath, name);
    } else {
      await createFolder(user.id, currentPath, name);
    }
    refresh();
  };

  const handleOpen = async (item) => {
    if (item.type !== "file") return;
    try {
      const path = currentPath ? `${currentPath}/${item.name}` : item.name;
      const data = await readFile(user.id, path);
      setViewerFile(data);
    } catch (err) {
      alert("Could not open file: " + err.message);
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

    const sourceParentPath = clipboard.path.substring(
      0,
      clipboard.path.lastIndexOf("/")
    );

    if (clipboard.path === currentPath) {
      alert(
        "Cannot paste an item into its original location. Navigate to a different folder."
      );
      return;
    }

    if (clipboard.type === "copy" && sourceParentPath === currentPath) {
      alert(
        "Cannot copy item back into its immediate parent folder without renaming."
      );
      return;
    }
    try {
      if (clipboard.type === "copy") {
        await copyItem(user.id, clipboard.path, currentPath);
      } else {
        await moveItem(user.id, clipboard.path, currentPath);
        setClipboard(null);
      }
      refresh();
    } catch (err) {
      alert(err.message);
    }
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
      <h1>WELCOME 👽💚🪐</h1>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => {
            const parts = currentPath.split("/");
            parts.pop();
            setCurrentPath(parts.join("/"));
          }}
          disabled={!currentPath}
          style={btnStyle}
        >
          ⬆
        </button>

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

        <button
          onClick={() => fileInputRef.current.click()}
          style={{ ...btnStyle, background: "#4CAF50", color: "#fff" }}
        >
          ☁ Upload
        </button>
        <form action="/upload" method="post" encType="multipart/form-data">
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleUpload}
          />
        </form>
        <button onClick={handleCreate} style={btnStyle}>
          + New Item
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
                <button
                  onClick={() => handleOpen(selected)}
                  style={{ ...btnStyle, background: "#FFC107" }}
                >
                  Open
                </button>{" "}
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
              onDoubleClick={handleOpen}
            />
          )
        )}
      </div>
      {info && (
        <div style={modalStyle}>
          <h3>Info</h3>
          <p>Size: {info.size}</p>
          <p>Created: {new Date(info.created).toLocaleString()}</p>
          <button onClick={() => setInfo(null)}>Close</button>
        </div>
      )}
      <FileViewer file={viewerFile} onClose={() => setViewerFile(null)} />{" "}
    </div>
  );
}

const btnStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: 4,
  border: "1px solid #ccc",
  background: "white",
};
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  borderRadius: "8px",
  zIndex: 1000,
};
