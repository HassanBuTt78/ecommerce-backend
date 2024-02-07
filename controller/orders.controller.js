const db = require("../database/order-actions.js");
const cartActions = require("../database/cart-actions.js");
const CustomError = require("../utils/custom-error.js");

const orderController = {
    createOrder: async (req, res) => {
        const userId = req.userData._id;
        const address = req.body.address;
        let items;
        if (req.body.items) {
            items = req.body.items;
        } else {
            items = await cartActions.getUserCart(userId);
        }

        if (items.length < 1) {
            throw new CustomError(
                400,
                "there should be atleast one item in cart"
            );
        }

        const doc = {
            userId,
            items,
            address,
        };

        const orderData = await db.makeOrder(doc);

        const clearedCart = await cartActions.emptyCart(userId);
        if (clearedCart.cart.length !== 0) {
            throw new CustomError(500, "Server ran into a problem");
        }

        res.json({
            success: true,
            message: "order has been placed",
            data: orderData,
        });
    },
    getOrders: async (req, res) => {
        const orders = await db.getAllOrdersOf(req.userData._id);
        res.json({
            success: true,
            message: "orders retrieved successfully",
            data: orders,
        });
    },
    getOrderDetails: async (req, res) => {
        const orderId = req.params.orderId;
        const userId = req.userData._id;
        const order = await db.orderDetails(orderId, userId);
        res.json({
            success: true,
            message: "Order details retrieved successfully",
            data: order,
        });
    },
    updateOrder: async (req, res) => {
        const update = req.body;
        const orderId = req.params.orderId;
        const updatedOrder = await db.updateOrder(orderId, update);
        res.json({
            success: true,
            message: "Order details are updated!",
            data: updatedOrder,
        });
    },
};

module.exports = orderController;
