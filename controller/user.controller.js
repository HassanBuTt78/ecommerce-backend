const db = require("../database/user-actions.js");
const { User } = require("../model/user.js");
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
            if ("password" in update || "role" in update) {
                const err = new CustomError(
                    400,
                    "changing this data is not allowed through this route"
                );
                throw err;
            }

            const validData = await User.validate(update);
            if (!validData) {
                const err = new CustomError(400, "Invalid Body");
                throw err;
            }
            const updatedData = await db.updateUser(
                req.userData._id,
                update
            );
            if (!updatedData) {
                const err = new CustomError(500, "Server ran into a Problem");
                throw err;
            }
            res.status(200).json({
                success: true,
                message: "updated the user",
                data: {},
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = userController;
