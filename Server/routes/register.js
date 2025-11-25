const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const { BASE_PATH } = require("../handlers/pathUtils");

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).send("Missing info");

  try {
    const dbPath = path.join(__dirname, "../../Database/users.json");
    try {
      await fs.access(dbPath);
    } catch {
      await fs.writeFile(dbPath, "[]");
    }

    const data = await fs.readFile(dbPath, "utf8");
    const users = JSON.parse(data || "[]");

    if (users.find((u) => u.name === name))
      return res.status(400).send("Exists");

    const newUser = { id: Date.now().toString(), name, password, shared: [] };
    users.push(newUser);

    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
    await fs.mkdir(path.join(BASE_PATH, newUser.id), { recursive: true });

    res.send(newUser);
  } catch (err) {
    res.status(500).send("Error");
  }
});

module.exports = router;
