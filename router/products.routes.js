const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const adminAuthorize = require("../middleware/admin-authorization.js");

router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductDetails);

router.post("/", [adminAuthorize], productController.makeProduct);
router.put("/:productId", [adminAuthorize], productController.updateProduct);
router.delete("/:productId", [adminAuthorize], productController.deleteProduct)
module.exports = router;
