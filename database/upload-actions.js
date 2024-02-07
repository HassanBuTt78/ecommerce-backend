const Upload = require("../model/Upload.js");

const saveUpload = async (name, alt, url) => {
    const uploadedData = await Upload.create({ name, alt_name: alt, url });
    return uploadedData;
};

module.exports = {
    saveUpload,
};
