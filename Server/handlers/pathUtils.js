const path = require("path");
const BASE_PATH = path.resolve(__dirname, "../../Database/UsersFolders");

function getSecurePath(userId, userPath = "") {
  const userRoot = path.join(BASE_PATH, String(userId));
  const targetPath = path.resolve(userRoot, userPath);

  if (!targetPath.startsWith(userRoot)) {
    throw new Error("Access denied: Invalid path");
  }
  return { fullPath: targetPath, userRoot };
}

module.exports = { getSecurePath, BASE_PATH };
