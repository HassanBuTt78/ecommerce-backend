const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes.js");
const userRouter = require("./user.routes.js");
const productsRouter = require("./products.routes.js");
const cartRouter = require("./cart.routes.js");
const orderRouter = require("./orders.routes.js");
const reviewRouter = require("./review.routes.js");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
