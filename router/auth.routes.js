const express = require("express");
const router = express.Router();
const authController = require("../controller/authenticate.controller.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");
const codeVerification = require("../middleware/code-verification.js");

router.post("/signup", [validator(validationSchemas.registor)], authController.signup);
router.post("/login", [validator(validationSchemas.login)], authController.login);
router.get("/verify", [codeVerification], authController.emailVerification);
router.put("/reset-password", [validator(validationSchemas.updatePassword), codeVerification], authController.changePassword);
router.post("/reset-password", [validator(validationSchemas.resetPassByEmail)], authController.resetPassword);

module.exports = router;
