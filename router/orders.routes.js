const express = require("express");
const router = express.Router();
const orderController = require("../controller/orders.controller.js");
const userAuthorize = require("../middleware/user-authorization.js");
const adminAuthorize = require("../middleware/admin-authorization.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");

router.post(
    "/",
    [userAuthorize, validator(validationSchemas.orderCreation)],
    orderController.createOrder
);
router.get("/", [userAuthorize], orderController.getOrders);
router.get("/:orderId", [userAuthorize], orderController.getOrderDetails);
router.put(
    "/:orderId",
    [adminAuthorize, validator(validationSchemas.orderUpdate)],
    orderController.updateOrder
);

module.exports = router;
