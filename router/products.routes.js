const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const adminAuthorize = require("../middleware/admin-authorization.js");
const validator = require("../middleware/validator.js");
const validationSchemas = require("../utils/validation-schemas.js");

router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductDetails);

router.post(
    "/",
    [adminAuthorize, validator(validationSchemas.productCreation)],
    productController.makeProduct
);
router.put(
    "/:productId",
    [adminAuthorize, validator(validationSchemas.productUpdate)],
    productController.updateProduct
);
router.delete("/:productId", [adminAuthorize], productController.deleteProduct);
module.exports = router;
