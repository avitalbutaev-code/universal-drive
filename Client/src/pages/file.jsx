// pages/File.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getFile } from "../api";

export default function File() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function load() {
      // const data = await getFile(id);  // TODO: server call
      // setFile(data);
    }
    load();
  }, [id]);

  return (
    <div>
      <h1>File {id}</h1>
      {!file ? <p>Loading...</p> : <pre>{JSON.stringify(file, null, 2)}</pre>}
    </div>
  );
}
