const mongoose = require("mongoose");

const Verification = mongoose.model(
    "verification",
    new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            code: {
                type: String,
                required: true,
            },
            expiresAt: {
                type: Date,
                
                index: { expires: "24h" },
            },
        },
        { versionKey: false }
    )
);
module.exports = Verification;
