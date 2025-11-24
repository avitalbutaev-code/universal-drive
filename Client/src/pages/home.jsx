// import { useState, useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";
// import Navbar from "../components/navbar";
// import { createFolder, getUserFolders, deleteFolder } from "../api";

// export default function Home() {
//   const [folders, setFolders] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [newFileName, setNewFileName] = useState("");

//   useEffect(() => {
//     async function load() {
//       const data = await getUserFolders(); // TODO: server GET
//       await setFolders(data);
//     }
//     load();
//   }, []);

//   // Create a new folder
//   const handleCreateFolder = async (e) => {
//     e.preventDefault();
//     if (!newFolderName) return;
//     createFolder(newFolderName); // TODO: server POST
//     const newFolder = { id: Date.now(), name: newFolderName };
//     await setFolders([...folders, newFolder]);
//     setNewFolderName("");
//   };

//   // Create a new file
//   const handleCreateFile = (e) => {
//     e.preventDefault();
//     if (!newFileName) return;

//     const newFile = { id: Date.now(), name: newFileName };
//     setFiles([...files, newFile]);
//     setNewFileName("");

//     // TODO: server POST
//   };

//   // Delete folder
//   const handleDeleteFolder = (folderName) => {
//     deleteFolder(folderName); // TODO: server DELETE

//     setFolders(folders.filter((f) => f.name !== folderName));
//   };

//   return (
//     <div>
//       {" "}
//       <Navbar />
//       <div style={{ maxWidth: "600px", margin: "auto" }}>
//         <h1>Home</h1>

//         {/* ------------------ CREATE FOLDER ------------------ */}
//         <form onSubmit={handleCreateFolder} style={{ marginBottom: "20px" }}>
//           <input
//             placeholder="New folder name"
//             value={newFolderName}
//             onChange={(e) => setNewFolderName(e.target.value)}
//           />
//           <button>Create Folder</button>
//         </form>

//         {/* ------------------ CREATE FILE ------------------ */}
//         <form onSubmit={handleCreateFile} style={{ marginBottom: "20px" }}>
//           <input
//             placeholder="New file name"
//             value={newFileName}
//             onChange={(e) => setNewFileName(e.target.value)}
//           />
//           <button>Create File</button>
//         </form>

//         {/* ------------------ FOLDERS LIST ------------------ */}
//         <h2>Folders</h2>
//         {folders.length === 0 ? (
//           <p>No folders yet</p>
//         ) : (
//           <ul>
//             {folders.map((f) => (
//               <li key={f.id} style={{ marginBottom: "10px" }}>
//                 <Link to={`/folders/${f.id}`}>{f.name}</Link>
//                 <button
//                   style={{ marginLeft: "10px" }}
//                   onClick={() => handleDeleteFolder(f.name)}
//                 >
//                   DELETE
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* ------------------ FILES LIST ------------------ */}
//         {/* <h2>Files</h2>
//         {files.length === 0 ? (
//           <p>No files yet</p>
//         ) : (
//           <ul>
//             {files.map((f) => (
//               <li key={f.id}>{f.name}</li>
//             ))}
//           </ul>
//         )} */}
//       </div>
//       <Outlet />
//     </div>
//   );
// }
// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { getFolder, deleteFile } from "../api";
import Folder from "../components/folder";
import File from "../components/file";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = 1;

  const loadFolder = async (path = "") => {
    setLoading(true);
    setError(null);
    try {
      const items = await getFolder(userId, path);
      setFolders(items.filter((i) => i.type === "folder"));
      setFiles(items.filter((i) => i.type === "file"));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFolder();
  }, []);

  const handleDeleteFile = async (file) => {
    if (!window.confirm(`Delete ${file.name}?`)) return;
    try {
      await deleteFile(userId, file.name);
      loadFolder();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        {folders.map((f) => (
          <Folder key={f.name} folder={f} onClick={() => loadFolder(f.name)} />
        ))}
        {files.map((f) => (
          <File key={f.name} file={f} onClick={() => handleDeleteFile(f)} />
        ))}
      </div>
    </div>
  );
}
