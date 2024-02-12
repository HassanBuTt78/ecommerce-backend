const fs = require("fs").promises;
const path = require("path");
const CustomError = require("./custom-error.js");

const deleteFile = async (filePath) => {
    try {
        await fs.unlink(path.join(__dirname, ".." + filePath));
        return true;
    } catch (err) {
        throw new CustomError(500, "server ran into a problem, try again");
    }
};

module.exports = {
    deleteFile,
};
