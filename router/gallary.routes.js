const express = require("express");
const router = express.Router();

const gallaryController = require("../controller/gallary.controller.js");
const upload = require("../middleware/file-upload.js");

router.post("/", [upload.single("image")], gallaryController.uploadImage);

module.exports = router;
