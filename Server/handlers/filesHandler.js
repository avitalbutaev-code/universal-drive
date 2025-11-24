const fs = require("fs/promises");
const path = require("path");
const { getSecurePath } = require("./pathUtils");

async function getFileInfo(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.query;

  try {
    const { fullPath } = getSecurePath(id, filePath);
    const stats = await fs.stat(fullPath);
    res.json({
      name: path.basename(fullPath),
      size: stats.size,
      created: stats.birthtime,
      isFile: stats.isFile(),
    });
  } catch (err) {
    res.status(500).json({ error: "Info failed" });
  }
}

async function renameFile(req, res) {
  const { id } = req.params;
  const { currentPath, newName } = req.body;
  try {
    const { fullPath: oldFull } = getSecurePath(id, currentPath);
    const { fullPath: newFull } = getSecurePath(
      id,
      path.join(path.dirname(currentPath), newName)
    );
    await fs.rename(oldFull, newFull);
    res.json({ message: "Renamed" });
  } catch (err) {
    res.status(500).json({ error: "Rename failed" });
  }
}

async function deleteFile(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.body;
  try {
    const { fullPath } = getSecurePath(id, filePath);
    await fs.unlink(fullPath);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
}

async function copyFile(req, res) {
  const { id } = req.params;
  const { sourcePath, destinationPath } = req.body;
  try {
    const { fullPath: src } = getSecurePath(id, sourcePath);
    const fileName = path.basename(sourcePath);
    const { fullPath: dest } = getSecurePath(
      id,
      path.join(destinationPath, fileName)
    );
    await fs.copyFile(src, dest);
    res.json({ message: "Copied" });
  } catch (err) {
    res.status(500).json({ error: "Copy failed" });
  }
}

async function moveFile(req, res) {
  const { id } = req.params;
  const { sourcePath, destinationPath } = req.body;
  try {
    const { fullPath: src } = getSecurePath(id, sourcePath);
    const fileName = path.basename(sourcePath);
    const { fullPath: dest } = getSecurePath(
      id,
      path.join(destinationPath, fileName)
    );
    await fs.rename(src, dest);
    res.json({ message: "Moved" });
  } catch (err) {
    res.status(500).json({ error: "Move failed" });
  }
}

async function downloadFile(req, res) {
  const { id } = req.params;
  const { path: filePath } = req.query;
  try {
    const { fullPath } = getSecurePath(id, filePath);
    res.download(fullPath);
  } catch (err) {
    res.status(500).send("Error downloading");
  }
}

async function uploadFile(req, res) {
  const { id } = req.params;
  const { currentPath } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file" });

  try {
    const { fullPath: dest } = getSecurePath(
      id,
      path.join(currentPath, file.originalname)
    );
    await fs.rename(file.path, dest);
    res.json({ message: "Uploaded" });
  } catch (err) {
    await fs.unlink(file.path).catch(() => {});
    res.status(500).json({ error: "Upload failed" });
  }
}

module.exports = {
  getFileInfo,
  renameFile,
  deleteFile,
  copyFile,
  moveFile,
  downloadFile,
  uploadFile,
};
