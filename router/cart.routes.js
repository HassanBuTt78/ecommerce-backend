const express = require("express");
const router = express.Router();
const userAuthorize = require("../middleware/user-authorization");
const cartController = require("../controller/cart.controller.js");

router.get("/", [userAuthorize], cartController.getCart);
router.post("/add/:productId", [userAuthorize], cartController.addToCart);
router.put("/update/:productId", [userAuthorize], cartController.updateCartItem);
router.delete("/remove/:productId", [userAuthorize], cartController.removeCartItem);

module.exports = router;
