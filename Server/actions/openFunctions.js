async function openFolder(path = null) {
  const data = await fs.readFile(
    path.join(__dirname, "../../Database/users.json"),
    "utf8"
  );
  const users = JSON.parse(data);
  const user = users.find((u) => u.id === id);
  if (user) {
    try {
      const folderPath = user.folder;
      const items = await fs.readdir(folderPath, { withFileTypes: true });
      const result = items.map((item) => ({
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
      }));
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to read folder" });
    }
  } else {
    res.status(404).send("no such user");
  }
}
