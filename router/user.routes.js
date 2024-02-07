const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");

router.get("/", [userAuthorize], userController.getUserData);
router.put(
    "/",
    [userAuthorize, validator(validationSchemas.userUpdate)],
    userController.updateUserData
);

module.exports = router;
