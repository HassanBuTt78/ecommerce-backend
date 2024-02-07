const express = require("express");
const router = express.Router();
const reviewController = require("../controller/review.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");


router.get("/:productId", reviewController.getReviews);
router.post("/:productId", [userAuthorize, validator(validationSchemas.reviewCreation)], reviewController.writeReview);

module.exports = router;
