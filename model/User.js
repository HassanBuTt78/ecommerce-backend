const mongoose = require("mongoose");

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            fname: {
                type: String,
                required: true,
            },
            lname: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                default: "user",
            },
            addresses: [
                {
                    street: String,
                    state: String,
                    City: String,
                    Country: String,
                    zip: String,
                },
            ],
            cart: [
                {
                    productId: {
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
