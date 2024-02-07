const db = require("../database/user-actions.js");
const validator = require("../utils/validation-schemas.js");
const CustomError = require("../utils/custom-error.js");

const userController = {
    getUserData: async (req, res, next) => {
        try {
            res.json(req.userData);
        } catch (err) {
            next(err);
        }
    },
    updateUserData: async (req, res, next) => {
        try {
            const update = req.body;
            const { error } = validator.updateUserSchema.validate(update);
            if (error) {
                throw new CustomError(400, error.details[0].message);
            }

            const updatedData = await db.updateUser(req.userData._id, update);
            if (!updatedData) {
                const err = new CustomError(500, "Server ran into a Problem");
                throw err;
            }
            res.status(200).json({
                success: true,
                message: "updated the user",
                data: updatedData,
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userController;
