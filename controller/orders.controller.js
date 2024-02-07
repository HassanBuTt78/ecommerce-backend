const db = require("../database/order-actions.js");
const cartActions = require("../database/cart-actions.js");
const CustomError = require("../utils/custom-error.js");
const {
    newOrderSchema,
    updateOrderSchema,
} = require("../utils/validation-schemas.js");

const orderController = {
    createOrder: async (req, res, next) => {
        try {
            const userId = req.userData._id;
            const address = req.body.address;
            let items;
            if (req.body.items) {
                items = req.body.items;
            } else {
                items = await cartActions.getUserCart(userId);
            }
            console.log(items);
            const doc = {
                userId,
                items,
                address,
            };

            const { error, _ } = newOrderSchema.validate(doc, {
                stripUnknown: true,
            });
            if (error) {
                throw new CustomError(400, error.details[0].message);
            }

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
        } catch (err) {
            next(err);
        }
    },
    getOrders: async (req, res, next) => {
        try {
            const orders = await db.getAllOrdersOf(req.userData._id);
            res.json({
                success: true,
                message: "orders retrieved successfully",
                data: orders,
            });
        } catch (err) {
            next(err);
        }
    },
    getOrderDetails: async (req, res, next) => {
        try {
            const orderId = req.params.orderId;
            const userId = req.userData._id;
            const order = await db.orderDetails(orderId, userId);
            res.json({
                success: true,
                message: "Order details retrieved successfully",
                data: order,
            });
        } catch (err) {
            next(err);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const update = req.body;
            const orderId = req.params.orderId;
            const { error, _ } = updateOrderSchema.validate(update);
            if (error) {
                throw new CustomError(400, error.details[0].message);
            }
            const updatedOrder = await db.updateOrder(orderId, update);
            res.json({
                success: true,
                message: "Order details are updated!",
                data: updatedOrder,
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = orderController;
