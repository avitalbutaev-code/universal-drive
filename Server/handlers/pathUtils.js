const path = require("path");

// Adjust this path to match your actual folders location
const BASE_PATH = path.resolve(__dirname, "../../Database/UsersFolders");

function getSecurePath(userId, userPath = "") {
  const userRoot = path.join(BASE_PATH, String(userId));
  // Resolve ensures we handle ".." correctly, but we must check if it's still inside root
  const targetPath = path.resolve(userRoot, userPath);

  if (!targetPath.startsWith(userRoot)) {
    throw new Error("Access denied: Invalid path");
  }
  return { fullPath: targetPath, userRoot };
}

module.exports = { getSecurePath, BASE_PATH };
