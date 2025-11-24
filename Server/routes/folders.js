const express = require("express");
const router = express.Router({ mergeParams: true });
const folders = require("../handlers/foldersHandler");

router.post("/show", folders.showFolder);
router.post("/create", folders.createFolder);
router.delete("/delete", folders.deleteFolder);

module.exports = router;
