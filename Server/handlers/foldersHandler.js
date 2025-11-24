const fs = require("fs/promises");
const path = require("path");
const { getSecurePath } = require("./pathUtils");

async function showFolder(req, res) {
  const { id } = req.params;
  const { path: folderPath = "" } = req.body;

  try {
    const { fullPath } = getSecurePath(id, folderPath);
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    const result = items.map((item) => ({
      name: item.name,
      type: item.isDirectory() ? "folder" : "file",
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}

async function createFolder(req, res) {
  const { id } = req.params;
  const { path: currentPath, folderName } = req.body;
  try {
    const { fullPath } = getSecurePath(id, path.join(currentPath, folderName));
    await fs.mkdir(fullPath);
    res.json({ message: "Created" });
  } catch (err) {
    res.status(500).json({ error: "Create failed" });
  }
}

async function deleteFolder(req, res) {
  const { id } = req.params;
  const { path: folderPath } = req.body;
  try {
    const { fullPath } = getSecurePath(id, folderPath);
    await fs.rmdir(fullPath);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "NotEmpty or Error" });
  }
}

module.exports = { showFolder, createFolder, deleteFolder };
