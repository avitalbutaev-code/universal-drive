// pages/Folders.jsx
import { useEffect, useState } from "react";
// import { getUserFolders } from "../api";

export default function Folders() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function load() {
      // const data = await getUserFolders();  // TODO: server call
      // setFolders(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Your Folders</h1>
      <ul>
        {folders.map((f) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}
