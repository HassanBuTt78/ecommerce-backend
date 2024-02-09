const express = require("express");
const router = express.Router();

const gallaryController = require("../controller/upload.controller.js");
const upload = require("../middleware/file-upload.js");
const adminAuthorize = require("../middleware/admin-authorization.js");

router.get("/", [adminAuthorize], gallaryController.getAllUploads);
router.post(
    "/",
    [adminAuthorize, upload.single("image")],
    gallaryController.uploadImage
);
router.delete("/:fileName", [adminAuthorize], gallaryController.deleteImage);

module.exports = router;
