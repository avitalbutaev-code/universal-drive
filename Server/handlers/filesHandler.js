const fs = require("fs/promises");
const path = require("path");

const BASE_PATH = path.join(__dirname, "../../Database/UsersFolders");

function getUserRoot(id) {
  return path.join(BASE_PATH, id);
}

async function getFileInfo(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.body;

  try {
    const fullPath = path.join(getUserRoot(id), filePath);
    const stats = await fs.stat(fullPath);

    res.json({
      name: path.basename(fullPath),
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      isFile: stats.isFile(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get file info" });
  }
}

async function showFile(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.body;

  try {
    const fullPath = path.join(getUserRoot(id), filePath);
    const content = await fs.readFile(fullPath, "utf8");
    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read file" });
  }
}

async function renameFile(req, res) {
  const { id } = req.params;
  const { oldPath, newName } = req.body;

  try {
    const oldFull = path.join(getUserRoot(id), oldPath);
    const newFull = path.join(path.dirname(oldFull), newName);

    await fs.rename(oldFull, newFull);
    res.json({ message: "File renamed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Rename failed" });
  }
}

async function copyFile(req, res) {
  const { id } = req.params;
  const { sourcePath, targetPath } = req.body;

  try {
    const src = path.join(getUserRoot(id), sourcePath);
    const dest = path.join(getUserRoot(id), targetPath);

    await fs.copyFile(src, dest);
    res.json({ message: "File copied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Copy failed" });
  }
}

async function moveFile(req, res) {
  const { id } = req.params;
  const { sourcePath, targetPath } = req.body;

  try {
    const src = path.join(getUserRoot(id), sourcePath);
    const dest = path.join(getUserRoot(id), targetPath);

    await fs.rename(src, dest);
    res.json({ message: "File moved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Move failed" });
  }
}

async function deleteFile(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.body;

  try {
    const fullPath = path.join(getUserRoot(id), filePath);
    await fs.unlink(fullPath);

    res.json({ message: "File deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
}

module.exports = {
  getFileInfo,
  showFile,
  renameFile,
  copyFile,
  moveFile,
  deleteFile,
};
