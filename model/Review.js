const mongoose = require("mongoose");

const Review = mongoose.model(
    "review",
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: true },
        },
        { versionKey: false }
    )
);
module.exports = Review;
