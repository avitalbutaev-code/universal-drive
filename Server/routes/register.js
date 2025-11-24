const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

router.post("/", async (req, res) => {
  const body = req.body;

  console.log(body);
  const name = body.name;
  const password = body.password;
  console.log(name);
  console.log(password);

  if (!name || !password)
    return res.status(400).send("Name and password required");

  try {
    const filePath = path.join(__dirname, "../../Database/users.json");
    const data = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(data);

    if (users.find((u) => u.name === name)) {
      return res.status(400).send("User already exists");
    }

    const newUser = { id: Date.now().toString(), name, password, shared: [] };
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    res.send({ username: name, id: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
