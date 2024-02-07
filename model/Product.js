const mongoose = require("mongoose");

const Product = mongoose.model(
    "product",
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            image: {
                type: String,
                default:
                    "https://i.ibb.co/hK4PTy4/woocommerce-placeholder.webp",
            },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            category: { type: String, required: true },
        },
        { versionKey: false }
    )
);
module.exports = Product;
