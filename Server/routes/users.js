var express = require("express");
var router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const actions = require;

// Load users folders and files
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!req.params.id) {
    return res.status(404).send("no id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) res.send("user not found");

    try {
      const folderPath = path.join(
        __dirname,
        `../../Database/UsersFolders/${id}`
      );
      console.log(folderPath);

      const items = await fs.readdir(folderPath, { withFileTypes: true });
      const result = items.map((item) => ({
        name: item.name,
        type: item.isDirectory() ? true : false,
      }));
      if (!items) res.status(500).json({ error: "no items" });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to read folder" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});

//Create a folder or a file
router.post("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!req.params.id) {
    return res.status(404).send("no id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    console.log(req.body);
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) res.send("user not found");
    try {
      const folderPath = path.join(
        __dirname,
        `../../Database/UsersFolders/${id}/${req.body.path}`
      );
      req.body.isDirectory
        ? await fs.mkdir(folderPath)
        : await fs.writeFile(folderPath, "", "utf8");
      res.send("Success");
    } catch (err) {
      console.error(err);
      res.status(500).send("failed to create folder");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});
// Delete folder or file
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!req.params.id) {
    return res.status(404).send("no id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );

    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) res.send("user not found");
    try {
      const folderPath = path.join(
        __dirname,
        `../../Database/UsersFolders/${id}/${req.body.path}`
      );
      req.body.isDirectory
        ? await fs.rm(folderPath, { recursive: true, force: true })
        : await fs.unlink(folderPath);
      res.send("Success");
    } catch (err) {
      console.error(err);
      res.status(500).send("failed delete file");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});

//Opening a folder
router.get("/:id/:path", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id) {
    return res.status(404).send("no id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) res.send("user not found");
    {
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
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});
// Open a file
router.get("/:id/:path", async function (req, res, next) {
  const id = Number(req.params.id);
  if (!req.params.id) {
    return res.status(404).send("no id");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) res.send("user not found");
    {
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

module.exports = router;
