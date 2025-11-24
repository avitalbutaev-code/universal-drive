// // pages/Bin.jsx
// import { useEffect, useState } from "react";
// // TODO: you'll need a server method: getDeletedItems()

// export default function Bin() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     async function load() {
//       // const deleted = await getDeletedItems(); // TODO: server call
//       // setItems(deleted);
//     }
//     load();
//   }, []);

//   return (
//     <div>
//       <h1>Deleted Files</h1>
//       {items.length === 0 ? (
//         <p>Bin is empty</p>
//       ) : (
//         <ul>
//           {items.map((i) => (
//             <li key={i.id}>{i.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// src/pages/Bin.js
import React from "react";

export default function Bin() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Bin (Trash)</h2>
      <p>This is a placeholder for deleted files/folders.</p>
    </div>
  );
}
