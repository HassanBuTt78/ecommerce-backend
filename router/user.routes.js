const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");

router.get("/", [userAuthorize], userController.getUserData);
router.put("/", [userAuthorize], userController.updateUserData);

module.exports = router;
