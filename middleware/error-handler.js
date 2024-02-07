const customError = require("../utils/custom-error.js");
const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        res.status(err.status).json({
            success: false,
            error: {
                statusCode: err.status,
                message: err.message,
            },
        });
        return next(err);
    }
    console.log(`ERROR::: ${err.message}`, err.stack);
    res.status(500).json({
        success: false,
        error: {
            statusCode: 500,
            message: "server ran into a problem, try again later",
        },
    });
    return next(err);
};

module.exports = errorHandler;
