const mongoose = require("mongoose");

const Order = mongoose.model(
    "order",
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            status: { type: String, default: "pending" },
            paymentStatus: { type: String, default: "pending" },
            items: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "product",
                    },
                    quantity: { type: Number, default: 1 },
                    price: Number,
                    total: Number,
                },
            ],
            shipping: {
                address: {
                    street: String,
                    city: String,
                    state: String,
                    country: String,
                    zip: String,
                },
            },
            paymentMethod: {
                type: String,
                default: "cash-on-delivery",
            },
        },
        { versionKey: false }
    )
);
module.exports = Order;
