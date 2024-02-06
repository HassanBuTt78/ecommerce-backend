const db = require("../database/user-actions.js");
const { makeToken } = require("../utils/jwt.js");
const CustomError = require("../utils/custom-error.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (data, role) => {
    data.password = await bcrypt.hash(data.password, saltRounds);
    const savedData = await db.addUser(data, role);
    if (!savedData) return false;
    return true;
};

const authenticateUser = async (data) => {
    const user = await db.getUserByUsername(data.username);
    if (!user) {
        const err = new CustomError(404, "username doesn't exist");
        throw err;
    }
    const truePass = await bcrypt.compare(data.password, user.password);
    if (!truePass) {
        const err = new CustomError(401, "incorrect password");
        throw err;
    }
    return user;
};

const authController = {
    signup: async (req, res, next) => {
        try {
            const data = req.body;
            //Checking for valid Body
            if (!("username" in data) || !("password" in data)) {
                const err = new CustomError(400, "invalid body");
                throw err;
            }

            //Checking for Existing Username
            const existingUser = await db.getUserByUsername(data.username);
            if (existingUser) {
                const err = new CustomError(409, "username already taken");
                throw err;
            }

            //Adding User in Database
            const registered = await registerUser(data, "user");
            if (!registered) {
                const err = new CustomError(500, "server ran into a problem");
                throw err;
            }
            //Send Success Message
            res.status(200).json({
                success: true,
                message: "Successfully Registered User",
                data: {},
            });
            res.end();
        } catch (err) {
            next(err);
        }
    },
    //
    //
    login: async (req, res, next) => {
        try {
            const data = req.body;
            //Checking for valid Body
            if (!("username" in data) || !("password" in data)) {
                const err = new CustomError(400, "invalid body");
                throw err;
            }

            //authenticating User
            const userData = await authenticateUser(data);

            //making token
            const token = makeToken(userData);
            res.cookie("jwt", token);
            return res.status(200).json({
                success: true,
                message: "You are Logged In",
                data: {},
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;
