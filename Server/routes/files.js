const express = require("express");
const router = express.Router({ mergeParams: true });
const files = require("../handlers/filesHandler");
const multer = require("multer");
const os = require("os");

const upload = multer({ dest: os.tmpdir() });

router.get("/info", files.getFileInfo);
router.put("/rename", files.renameFile);
router.delete("/delete", files.deleteFile);
router.post("/copy", files.copyFile);
router.post("/move", files.moveFile);
router.get("/download", files.downloadFile);
router.post("/upload", upload.single("myFile"), files.uploadFile);

module.exports = router;
