// api.js
// Here you will later import axios or fetch to talk to your Express server

export async function getUserFolders() {
  // TODO: call server: GET /folders
}

export async function getFolderContent(folderId) {
  // TODO: call server: GET /folders/:id
}

export async function getFile(fileId) {
  // TODO: call server: GET /files/:id
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
