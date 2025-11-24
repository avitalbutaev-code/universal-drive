// api.js
// Here you will later import axios or fetch to talk to your Express server
const BASE_URL = "http://localhost:3000";

export async function getUserFolders() {
  const res = await fetch(`${BASE_URL}/users/1`);
  return res.json();
}
// TODO: call server: GET /folders

export async function createFolder(foldername) {
  const res = await fetch(
    `${BASE_URL}/users/1`, //${localStorage.getItem("currentUser")
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: foldername, isDirectory: true }),
    }
  );
  return res.json();
}

export async function getFolderContent(folderId) {
  // TODO: call server: GET /folders/:id
}

export async function getFile(fileId) {
  // TODO: call server: GET /files/:id
}
export async function deleteFolder(foldername) {
  const res = await fetch(
    `${BASE_URL}/users/${localStorage.getItem("currentUser")}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: foldername, isDirectory: true }),
    }
  );
  return res.json();
}
export async function deleteFile(fileId) {
  // TODO: call server: DELETE /files/:id
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // handle errors
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  const userData = await res.json(); // parse JSON from response
  console.log(userData);
  // Save only the data, not the response object
  localStorage.setItem("currentUser", JSON.stringify(userData));

  return userData; // { username, id }
}

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Registration failed");
  }

  const userData = await res.json();
  localStorage.setItem("currentUser", JSON.stringify(userData));
  return userData;
}
