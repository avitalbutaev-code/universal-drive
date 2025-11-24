// const BASE_URL = "http://localhost:3000";

// export async function request(url, options = {}) {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) throw new Error("Failed to load todos");
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// export async function getUserFolders() {
//   const res = await fetch(`${BASE_URL}/users/1`);
//   return res.json();
// }

// export async function createFolder(foldername) {
//   const res = await fetch(
//     `${BASE_URL}/users/1`, //${localStorage.getItem("currentUser")
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ path: foldername, isDirectory: true }),
//     }
//   );
//   return res.json();
// }

// export async function getFolderContent(folderId) {
//   // TODO: call server: GET /folders/:id
// }

// export async function getFile(fileId) {
//   // TODO: call server: GET /files/:id
// }
// export async function deleteFolder(foldername) {
//   const res = await fetch(`${BASE_URL}/users/1`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ path: foldername, isDirectory: true }),
//   });
//   return res.json();
// }
// export async function deleteFile(fileId) {
//   // TODO: call server: DELETE /files/:id
// }

// export async function loginUser(data) {
//   // TODO: POST /auth/login
// }

// export async function registerUser(data) {
//   // TODO: POST /auth/register
// }
// src/api.js
const BASE_URL = "http://localhost:3000"; // your server URL

export async function getFolder(id, path = "") {
  try {
    const res = await fetch(`${BASE_URL}/${id}/folders/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: path ? path : undefined,
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

export async function createFolder(id, path, name) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/folders/rename`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPath: path, newName: name }),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteFolder(id, path) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/folders/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

export async function getFileInfo(id, path) {
  try {
    const res = await fetch(`${BASE_URL}/files/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

export async function showFile(id, path) {
  try {
    const res = await fetch(`${BASE_URL}/files/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteFile(id, path) {
  try {
    const res = await fetch(`${BASE_URL}/files/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    if (!res.ok) throw res;
    return res.json();
  } catch (err) {
    return handleError(err);
  }
}

// generic error handler
async function handleError(err) {
  let message = "Unknown error";
  try {
    const data = await err.json();
    message = data.error || message;
  } catch {
    console.log("error");
  }
  return Promise.reject(message);
}
