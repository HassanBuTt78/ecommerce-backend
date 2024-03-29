const db = require("../database/cart-actions.js");
const CustomError = require("../utils/custom-error.js");

const cartController = {
    getCart: async (req, res) => {
        const userId = req.userData._id;
        const cart = await db.getUserCart(userId);
        res.json({
            success: true,
            message: "Cart retrieval Successful",
            data: cart,
        });
    },
    addToCart: async (req, res) => {
        const quantity = req.body.quantity || 1;
        const userId = req.userData._id;
        const productId = req.params.productId;
        const updatedUser = await db.addItemToCart({
            quantity,
            userId,
            productId,
        });
        res.json({
            success: true,
            message: "product added to the cart",
            data: updatedUser.cart,
        });
    },
    updateCartItem: async (req, res) => {
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const userId = req.userData._id;
        if (!quantity) {
            throw new CustomError(400, "Body don't have 'quantity' to update");
        }
        const updatedUser = await db.updateCartItem({
            productId,
            quantity,
            userId,
        });
        res.json({
            success: true,
            message: "Item quantity is updated",
            data: updatedUser.cart,
        });
    },
    removeCartItem: async (req, res) => {
        const productId = req.params.productId;
        const userId = req.userData._id;
        const updatedUser = await db.deleteCartItem({
            productId,
            userId,
        });
        res.json({
            success: true,
            message: "Item has been removed from the cart",
            data: updatedUser.cart,
        });
    },
};

module.exports = cartController;
