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
  const res = await fetch(`${BASE_URL}/users/1`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: foldername, isDirectory: true }),
  });
  return res.json();
}
export async function deleteFile(fileId) {
  // TODO: call server: DELETE /files/:id
}

export async function loginUser(data) {
  // TODO: POST /auth/login
}

export async function registerUser(data) {
  // TODO: POST /auth/register
}
