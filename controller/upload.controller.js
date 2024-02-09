const CustomError = require("../utils/custom-error.js");
const db = require("../database/upload-actions.js");
const { deleteFile } = require("../utils/file-management.js");

const gallaryController = {
    uploadImage: async (req, res) => {
        const alt = req.body.alt;
        const file = req.file;
        if (!file) {
            throw new CustomError(400, "Upload File is missing");
        }

        const url = `/public/uploads/${file.filename}`;
        const savedData = await db.saveUpload(file.filename, alt, url);
        res.json({
            success: true,
            message: "file has been uploaded",
            data: savedData,
        });
    },
    deleteImage: async (req, res) => {
        const fileName = req.params.fileName;
        const deleted = await db.deleteUpload(fileName);
        await deleteFile(deleted.url);

        res.json({
            success: true,
            message: "upload has been deleted",
            data: deleted,
        });
    },
    getAllUploads: async (req, res) => {
        const data = req.query;
        const uploads = await db.getUploads(data);
        res.json({
            success: true,
            message: "uploads brought successfully",
            data: uploads,
        });
    },
};

module.exports = gallaryController;
