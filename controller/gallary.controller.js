const CustomError = require("../utils/custom-error.js");
const db = require("../database/upload-actions.js");

const gallaryController = {
    uploadImage: async (req, res) => {
        const alt = req.body.alt;
        const file = req.file;
        if (!file) {
            throw new CustomError(400, "Upload File is missing");
        }

        const url = `/static/uploads/${file.filename}`;
        const savedData = await db.saveUpload(file.filename, alt, url);
        res.json({
            success: true,
            message: "file has been uploaded",
            data: savedData,
        });
    },
};

module.exports = gallaryController;
