const db = require("../database/user-actions.js");
const CustomError = require("../utils/custom-error.js");

const userController = {
    getUserData: async (req, res) => {
        res.json(req.userData);
    },
    updateUserData: async (req, res) => {
        const update = req.body;

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
    },
};

module.exports = userController;
