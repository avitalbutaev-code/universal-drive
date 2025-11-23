import { useState } from "react";
import Navbar from "../components/navbar";
// import server methods later
// import { createFolder, createFile, getUserFolders, getUserFiles } from "../api";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");

  // Create new folder
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName) return;

    const newFolder = { id: Date.now(), name: newFolderName };
    setFolders([...folders, newFolder]);
    setNewFolderName("");

    // TODO: call server POST /folders
  };

  // Create new file
  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!newFileName) return;

    const newFile = { id: Date.now(), name: newFileName };
    setFiles([...files, newFile]);
    setNewFileName("");

    // TODO: call server POST /files
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Navbar />
      <h1>Home</h1>

      {/* Create Folder */}
      <form onSubmit={handleCreateFolder} style={{ marginBottom: "20px" }}>
        <input
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button>Create Folder</button>
      </form>

      {/* Create File */}
      <form onSubmit={handleCreateFile} style={{ marginBottom: "20px" }}>
        <input
          placeholder="New file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button>Create File</button>
      </form>

      {/* List Folders */}
      <h2>Folders</h2>
      {folders.length === 0 ? (
        <p>No folders yet</p>
      ) : (
        <ul>
          {folders.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      )}

      {/* List Files */}
      <h2>Files</h2>
      {files.length === 0 ? (
        <p>No files yet</p>
      ) : (
        <ul>
          {files.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
