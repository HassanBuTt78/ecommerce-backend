const mongoose = require("mongoose");

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                default: null,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            verified: {
                type: String,
                default: false,
            },
            password: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                default: "user",
            },
            address: {
                street: String,
                state: String,
                City: String,
                Country: String,
                zip: String,
            },
            cart: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "product",
                    },
                    quantity: { type: Number, default: 1 },
                },
            ],
        },
        { versionKey: false }
    )
);
module.exports = {
    User,
};
