var express = require("express");
var router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const actions = require;
// Load users folder
router.get("/:id", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id || isNaN(id)) {
    return res.status(404).send("inappropriate id");
  }
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});

//Opening a folder
router.get("/:id/:path", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id || isNaN(id)) {
    return res.status(404).send("inappropriate id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (user) {
      try {
        const folderPath = path.join(
          __dirname,
          `../${user.folder}/${req.params.path}`
        );
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
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});
// Open a file
router.get("/:id/:path", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id || isNaN(id)) {
    return res.status(404).send("inappropriate id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (user) {
      try {
        const folderPath = path.join(
          __dirname,
          `../${user.folder}/${req.params.path}`
        );
        res.sendFile(folderPath);
      } catch (err) {
        console.error(err);
        res.status(500).send("failed to open file");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});
router.post("/:id/:path", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id || isNaN(id)) {
    return res.status(404).send("inappropriate id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (user) {
      try {
        const folderPath = path.join(
          __dirname,
          `../${user.folder}/${req.params.path}`
        );
        fs.writeFile(req.body.name, req.body.content || null, "utf8");
        res.sendFile(folderPath);
      } catch (err) {
        console.error(err);
        res.status(500).send("failed to open file");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});

module.exports = router;
