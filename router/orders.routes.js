const express = require("express");
const router = express.Router();
const orderController = require("../controller/orders.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const adminAuthorize = require("../middleware/admin-authorization.js");

router.post("/", [userAuthorize], orderController.createOrder);
router.get("/", [userAuthorize], orderController.getOrders);
router.get("/:orderId", [userAuthorize], orderController.getOrderDetails);
router.put("/:orderId", [adminAuthorize], orderController.updateOrder);

module.exports = router;
