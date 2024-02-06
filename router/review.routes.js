const express = require("express");
const router = express.Router();
const reviewController = require("../controller/review.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");

router.get("/:productId", reviewController.getReviews);
router.post("/:productId", [userAuthorize], reviewController.writeReview);

module.exports = router;
