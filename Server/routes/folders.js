const express = require("express");
const router = express.Router({ mergeParams: true });
const folders = require("../handlers/foldersHandler");

router.post("/show", folders.showFolder);
router.put("/rename", folders.renameFolder);
router.delete("/delete", folders.deleteFolder);
router.get("/up", folders.upFolder);
router.get("/breadcrumbs", folders.breadcrumbs);

module.exports = router;
