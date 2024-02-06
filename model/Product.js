const mongoose = require("mongoose");

const Product = mongoose.model(
    "product",
    new mongoose.Schema(
        {
            name: String,
            description: String,
            price: Number,
            stock: Number,
            category: String,
        },
        { versionKey: false }
    )
);
module.exports = Product;
