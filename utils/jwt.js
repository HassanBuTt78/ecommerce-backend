const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const makeToken = (data) => {
    const token = jwt.sign({ id: data._id }, secretKey, {
        expiresIn: "24h",
    });

    return token;
};

const readToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return data;
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return null;
        }
    }
};

module.exports = {
    makeToken,
    readToken,
};
