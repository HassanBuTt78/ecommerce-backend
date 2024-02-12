const CustomError = require("../utils/custom-error.js");
const db = require("../database/verification-actions.js");
const validationSchemas = require("../utils/validation-schemas.js");

const codeVerification = async (req, res, next) => {
    const { error } = validationSchemas.verification.validate(req.query);
    if (error) {
        throw new CustomError(400, error.details[0].message);
    }
    const verified = await db.verifyToken(req.query.token, req.query.code);
    if (!verified) {
        throw new CustomError(401, "invalid verification information");
    }
    req.tokenData = verified;

    next();
};

module.exports = codeVerification;
