const mongoose = require("mongoose");

const connectDB = (URI) => {
    const db = mongoose.connect(URI);
    return db;
};

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 },
});

const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            username: String,
            password: String,
            role: String,
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
    connectDB,
};
