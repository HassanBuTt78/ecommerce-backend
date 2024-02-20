const Verification = require("../model/Verification.js");
const CustomError = require("../utils/custom-error.js");

function generateHexCode() {
    let randomNum = Math.floor(Math.random() * 16777215).toString(16);

    while (randomNum.length < 6) {
        randomNum = "0" + randomNum;
    }

    return randomNum.toUpperCase();
}

const createToken = async (userId) => {
    const token = await Verification.create({
        userId: userId,
        code: generateHexCode(),
    });
    return token;
};

const verifyToken = async (token, code) => {
    const changes = await Verification.findOneAndDelete({
        _id: token,
        code: code,
    });
    if (!changes) {
        throw new CustomError(401, "Invalid Verification Information");
    }
    return changes;
};

module.exports = {
    createToken,
    verifyToken,
};
