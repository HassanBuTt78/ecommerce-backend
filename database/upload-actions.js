const Upload = require("../model/Upload.js");
const CustomError = require("../utils/custom-error.js");

const saveUpload = async (name, alt, url) => {
    const uploadedData = await Upload.create({ name, alt_title: alt, url });
    return uploadedData;
};

const deleteUpload = async (fileName) => {
    const deleted = await Upload.findOneAndDelete({ name: fileName });
    if (!deleted) {
        throw new CustomError(404, "File doesn't Exist");
    }
    return deleted;
};

const getUploads = async (params) => {
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 20;

    const filter = {};
    const offset = (page - 1) * limit;
    const uploadCount = await Upload.countDocuments(filter);
    const uploads = await Upload.find(filter).skip(offset).limit(limit);

    if (!uploads) {
        throw new CustomError(500, "server ran into a problem");
    }
    return {
        uploadCount: uploadCount,
        page: page,
        limit: limit,
        uploads: uploads,
    };
};

module.exports = {
    saveUpload,
    deleteUpload,
    getUploads,
};
