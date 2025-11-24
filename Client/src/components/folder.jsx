// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "./navbar";

// import {
//   createFolder,
//   getUserFolders,
//   deleteFolder,
//   // TODO: add getFolderChildren, createFile, deleteFile etc
// } from "../api";

// export default function Folder() {
//   const { id } = useParams(); // current folder ID
//   const [folders, setFolders] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [newFileName, setNewFileName] = useState("");

//   // Load subfolders + files for this folder
//   useEffect(() => {
//     async function load() {
//       // 🔹 You will replace these with real API calls later
//       const subfolders = await getUserFolders(id); // TODO: get children BY PARENT ID
//       setFolders(subfolders);

//       // TODO: load files for this folder:
//       // const filesInFolder = await getFilesByFolder(id);
//       // setFiles(filesInFolder);
//     }
//     load();
//   }, [id]);

//   // Create new subfolder inside current folder
//   const handleCreateFolder = (e) => {
//     e.preventDefault();
//     if (!newFolderName) return;

//     createFolder(newFolderName, id);
//     // TODO: POST /folders with parent: id

//     const newFolder = { id: Date.now(), name: newFolderName, parent: id };
//     setFolders([...folders, newFolder]);
//     setNewFolderName("");
//   };

//   // Create file inside current folder
//   const handleCreateFile = (e) => {
//     e.preventDefault();
//     if (!newFileName) return;

//     const newFile = { id: Date.now(), name: newFileName, parent: id };
//     setFiles([...files, newFile]);
//     setNewFileName("");

//     // TODO: POST /files with parent: id
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto" }}>
//       <Navbar />
//       <h1>Folder: {id}</h1>

//       {/* --- SUBFOLDERS --- */}
//       <div>
//         <h2>Subfolders</h2>
//         <ul>
//           {folders.map((f) => (
//             <div key={f.id}>
//               <li>{f.name}</li>
//               <button onClick={() => deleteFolder(f.name)}>DELETE</button>
//             </div>
//           ))}
//         </ul>
//       </div>

//       {/* Create Folder */}
//       <form onSubmit={handleCreateFolder} style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="New folder name"
//           value={newFolderName}
//           onChange={(e) => setNewFolderName(e.target.value)}
//         />
//         <button>Create Subfolder</button>
//       </form>

//       {/* Create File */}
//       <form onSubmit={handleCreateFile} style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="New file name"
//           value={newFileName}
//           onChange={(e) => setNewFileName(e.target.value)}
//         />
//         <button>Create File</button>
//       </form>

//       {/* Files */}
//       <h2>Files</h2>
//       {files.length === 0 ? (
//         <p>No files in this folder</p>
//       ) : (
//         <ul>
//           {files.map((f) => (
//             <li key={f.id}>{f.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// src/components/Folder.js
import React from "react";

export default function Folder({ folder, onClick }) {
  return (
    <div
      style={{
        display: "inline-block",
        margin: 10,
        padding: 10,
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
      onClick={() => onClick(folder)}
    >
      📁 {folder.name}
    </div>
  );
}
