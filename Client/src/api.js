const BASE_URL = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };
const handle = async (res) => {
  if (!res.ok) throw new Error((await res.text()) || "Error");
  return res.json();
};

export const loginUser = (data) =>
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then(handle);
export const registerUser = (data) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then(handle);

export const getFolder = (uid, path) =>
  fetch(`${BASE_URL}/api/users/${uid}/folders/show`, {
    method: "POST",
    headers,
    body: JSON.stringify({ path }),
  }).then(handle);
export const createFolder = (uid, path, name) =>
  fetch(`${BASE_URL}/api/users/${uid}/folders/create`, {
    method: "POST",
    headers,
    body: JSON.stringify({ path, folderName: name }),
  }).then(handle);
export const deleteFolder = (uid, path) =>
  fetch(`${BASE_URL}/api/users/${uid}/folders/delete`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ path }),
  }).then(handle);

export const getFileInfo = (uid, path) =>
  fetch(
    `${BASE_URL}/api/users/${uid}/files/info?path=${encodeURIComponent(path)}`
  ).then(handle);
export const renameItem = (uid, path, newName) =>
  fetch(`${BASE_URL}/api/users/${uid}/files/rename`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ currentPath: path, newName }),
  }).then(handle);
export const deleteFile = (uid, path) =>
  fetch(`${BASE_URL}/api/users/${uid}/files/delete`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ path }),
  }).then(handle);
export const copyItem = (uid, src, dest) =>
  fetch(`${BASE_URL}/api/users/${uid}/files/copy`, {
    method: "POST",
    headers,
    body: JSON.stringify({ sourcePath: src, destinationPath: dest }),
  }).then(handle);
export const moveItem = (uid, src, dest) =>
  fetch(`${BASE_URL}/api/users/${uid}/files/move`, {
    method: "POST",
    headers,
    body: JSON.stringify({ sourcePath: src, destinationPath: dest }),
  }).then(handle);

export const downloadFile = async (uid, path, name) => {
  const res = await fetch(
    `${BASE_URL}/api/users/${uid}/files/download?path=${encodeURIComponent(
      path
    )}`
  );
  if (!res.ok) throw new Error("Download failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const uploadFile = (uid, path, file) => {
  const formData = new FormData();
  formData.append("myFile", file);
  formData.append("currentPath", path);
  return fetch(`${BASE_URL}/api/users/${uid}/files/upload`, {
    method: "POST",
    body: formData,
  }).then(handle);
};
