const fs = require("fs/promises");
const path = require("path");

const BASE_PATH = path.join(__dirname, "../../Database/UsersFolders");

function getUserRoot(id) {
  return path.join(BASE_PATH, id);
}

function showFolder(req, res) {
  const { id } = req.params;
  console.log("id: ", id);

  const { path: folderPath = "" } = req.body;
  console.log("folderPath: ", folderPath);

  fs.readdir(path.join(getUserRoot(id), folderPath), { withFileTypes: true })
    .then((items) => {
      const result = items.map((item) => ({
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
      }));
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to load folder" });
    });
}

async function renameFolder(req, res) {
  const { id } = req.params;
  const { oldPath, newName } = req.body;

  try {
    const oldFull = path.join(getUserRoot(id), oldPath);
    const newFull = path.join(path.dirname(oldFull), newName);

    await fs.rename(oldFull, newFull);
    res.json({ message: "Folder renamed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Rename failed" });
  }
}

async function deleteFolder(req, res) {
  const { id } = req.params;
  const { path: folderPath } = req.body;

  try {
    const fullPath = path.join(getUserRoot(id), folderPath);
    const files = await fs.readdir(fullPath);

    if (files.length > 0) {
      return res.status(400).json({ error: "Folder not empty" });
    }

    await fs.rmdir(fullPath);
    res.json({ message: "Folder deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
}

function upFolder(req, res) {
  const { currentPath } = req.body;
  const parentPath = path.dirname(currentPath);
  res.json({ path: parentPath });
}

function breadcrumbs(req, res) {
  const { path: folderPath = "" } = req.body;
  const parts = folderPath.split("/").filter(Boolean);

  const crumbs = parts.map((part, index) => ({
    name: part,
    path: parts.slice(0, index + 1).join("/"),
  }));

  res.json([{ name: "Root", path: "" }, ...crumbs]);
}

module.exports = {
  showFolder,
  renameFolder,
  deleteFolder,
  upFolder,
  breadcrumbs,
};
