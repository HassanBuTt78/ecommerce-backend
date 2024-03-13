const router = require("express").Router();
const checkoutController = require("../controller/checkout.controller");
const codeVerification = require("../middleware/code-verification");
const userAuthorize = require("../middleware/user-authorization");

router.post("/:orderId", [userAuthorize], checkoutController.collectPayment);
router.get("/:orderId/success", [codeVerification], checkoutController.successPayment);
router.get("/:orderId/cancel", [codeVerification], checkoutController.cancelPayment);

module.exports = router;
