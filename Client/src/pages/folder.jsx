// pages/Folders.jsx
import { useEffect, useState } from "react";
import { deleteFolder } from "../api";
import { getUserFolders } from "../api";

export default function Folders() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getUserFolders();
      setFolders(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Your Folders</h1>
      <ul>
        {folders.map((f) => (
          <>
            <li key={f.id}>{f.name}</li>
            <button key={f.id} onClick={deleteFolder(f.name)}>
              DELETE
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}
