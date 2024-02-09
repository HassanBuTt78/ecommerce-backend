const express = require("express");
const router = express.Router();

const gallaryController = require("../controller/upload.controller.js");
const upload = require("../middleware/file-upload.js");

router.get("/", gallaryController.getAllUploads);
router.post("/", [upload.single("image")], gallaryController.uploadImage);
router.delete("/:fileName", gallaryController.deleteImage);

module.exports = router;
