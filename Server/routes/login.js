var express = require("express");
var router = express.Router();
const fs = require("fs/promises");
const path = require("path");

router.post("/", async function (req, res, next) {
  const username = req.body.name;
  console.log(req.body);

  if (!username || !req.body.password) {
    return res.status(404).send("no username");
  }
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../Database/users.json"),
      "utf8"
    );
    const users = JSON.parse(data);
    const user = users.find((u) => u.name === username);
    if (!user) {
      return res.status(404).send("user not found");
    }
    if (user.password !== req.body.password) {
      return res.status(500).send("failed to login");
    }
    console.log(` username: ${username}, id: ${user.id} `);
    res.send({ username: username, id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("server failed");
  }
});

module.exports = router;
