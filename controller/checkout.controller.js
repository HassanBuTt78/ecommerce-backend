const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../model/Order");
const CustomError = require("../utils/custom-error");
const verificationActions = require("../database/verification-actions");

const checkoutController = {
    collectPayment: async (req, res) => {
        const { orderId } = req.params;
        const userId = req.userData._id;
        const order = await Order.findOne({ userId: userId, _id: orderId }).populate({ path: "items.product" });
        if (!order) {
            throw new CustomError(404, "order not found");
        }
        if (order.paymentStatus !== "pending") {
            return res.json({ success: true, message: `Payment is already ${order.paymentStatus}` });
        }
        order.paymentStatus = "processing";
        const verificationToken = await verificationActions.createToken();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: order.items.map((item) => {
                return {
                    price_data: {
                        unit_amount: item.product.price * 100,
                        product_data: {
                            name: item.product.name,
                            description: item.product.description,
                        },
                        currency: "usd",
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `http://${process.env.DOMAIN}/api/v1/checkout/${orderId}/success?token=${verificationToken._id}&code=${verificationToken.code}`,
            cancel_url: `http://${process.env.DOMAIN}/api/v1/checkout/${orderId}/cancel?token=${verificationToken._id}&code=${verificationToken.code}`,
        });
        res.json({ success: true, message: "payment session created", paymentUrl: session.url });
    },
    successPayment: async (req, res) => {
        const { orderId } = req.params;
        const orderDetails = await Order.findOne({ _id: orderId });
        if (!orderDetails) {
            throw new CustomError(404, "no order found");
        }
        orderDetails.paymentStatus = "successful";
        const updatedOrder = await orderDetails.save();
        res.json({
            success: true,
            message: "Payment made successfully",
            data: updatedOrder,
        });
    },
    cancelPayment: async (req, res) => {
        const { orderId } = await req.params;
        const orderDetails = Order.findOne({ _id: orderId });
        if (!orderDetails) {
            throw new CustomError(404, "no order found");
        }
        orderDetails.paymentStatus = "pending";
        const updatedOrder = await orderDetails.save();
        res.json({
            success: true,
            message: "Payment cancelled",
            data: updatedOrder,
        });
    },
};

module.exports = checkoutController;
