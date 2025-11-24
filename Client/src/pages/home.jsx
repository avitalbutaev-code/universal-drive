// import { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
// import { createFolder, getUserFolders, deleteFolder } from "../api";
// // import server methods later
// // import { createFolder, createFile, getUserFolders, getUserFiles } from "../api";

// export default function Home() {
//   const [folders, setFolders] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [newFolderName, setNewFolderName] = useState("");
//   const [newFileName, setNewFileName] = useState("");

//   useEffect(() => {
//     async function load() {
//       const data = await getUserFolders();
//       setFolders(data);
//     }
//     load();
//   }, []);

//   // Create new folder
//   const handleCreateFolder = (e) => {
//     e.preventDefault();
//     if (!newFolderName) return;
//     createFolder(newFolderName);

//     const newFolder = { id: Date.now(), name: newFolderName };
//     setFolders([...folders, newFolder]);
//     setNewFolderName("");

//     // TODO: call server POST /folders
//   };

//   // Create new file
//   const handleCreateFile = (e) => {
//     e.preventDefault();
//     if (!newFileName) return;

//     const newFile = { id: Date.now(), name: newFileName };
//     setFiles([...files, newFile]);
//     setNewFileName("");

//     // TODO: call server POST /files
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto" }}>
//       <Navbar />
//       <h1>Home</h1>

//       <div>
//         <h1>Your Folders</h1>
//         <ul>
//           {folders.map((f) => (
//             <>
//               <li key={f.id}>{f.name}</li>
//               <button key={f.id} onClick={deleteFolder(f.name)}>
//                 DELETE
//               </button>
//             </>
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
//         <button>Create Folder</button>
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

//       {/* List Folders */}
//       <h2>Folders</h2>
//       {folders.length === 0 ? (
//         <p>No folders yet</p>
//       ) : (
//         <ul>
//           {folders.map((f) => (
//             <li key={f.id}>{f.name}</li>
//           ))}
//         </ul>
//       )}

//       {/* List Files */}
//       <h2>Files</h2>
//       {files.length === 0 ? (
//         <p>No files yet</p>
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

import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { createFolder, getUserFolders, deleteFolder } from "../api";

export default function Home() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");

  // Load folders when component mounts
  useEffect(() => {
    async function load() {
      const data = await getUserFolders(); // TODO: server GET
      await setFolders(data);
    }
    load();
  }, []);

  // Create a new folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName) return;
    createFolder(newFolderName); // TODO: server POST
    const newFolder = { id: Date.now(), name: newFolderName };
    await setFolders([...folders, newFolder]);
    setNewFolderName("");
  };

  // Create a new file
  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!newFileName) return;

    const newFile = { id: Date.now(), name: newFileName };
    setFiles([...files, newFile]);
    setNewFileName("");

    // TODO: server POST
  };

  // Delete folder
  const handleDeleteFolder = (folderName) => {
    deleteFolder(folderName); // TODO: server DELETE

    setFolders(folders.filter((f) => f.name !== folderName));
  };

  return (
    <div>
      {" "}
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <h1>Home</h1>

        {/* ------------------ CREATE FOLDER ------------------ */}
        <form onSubmit={handleCreateFolder} style={{ marginBottom: "20px" }}>
          <input
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button>Create Folder</button>
        </form>

        {/* ------------------ CREATE FILE ------------------ */}
        <form onSubmit={handleCreateFile} style={{ marginBottom: "20px" }}>
          <input
            placeholder="New file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <button>Create File</button>
        </form>

        {/* ------------------ FOLDERS LIST ------------------ */}
        <h2>Folders</h2>
        {folders.length === 0 ? (
          <p>No folders yet</p>
        ) : (
          <ul>
            {folders.map((f) => (
              <li key={f.id} style={{ marginBottom: "10px" }}>
                <Link to={`/folders/${f.id}`}>{f.name}</Link>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDeleteFolder(f.name)}
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* ------------------ FILES LIST ------------------ */}
        {/* <h2>Files</h2>
        {files.length === 0 ? (
          <p>No files yet</p>
        ) : (
          <ul>
            {files.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        )} */}
      </div>
      <Outlet />
    </div>
  );
}
