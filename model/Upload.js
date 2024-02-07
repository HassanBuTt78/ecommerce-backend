const mongoose = require("mongoose");

const Upload = mongoose.model(
    "upload",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            alt_title: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                required: true,
            },
        },
        { versionKey: false }
    )
);
module.exports = Upload;
