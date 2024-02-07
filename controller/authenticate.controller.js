const db = require("../database/user-actions.js");
const { makeToken } = require("../utils/jwt.js");
const validator = require("../utils/validation-schemas.js");
const CustomError = require("../utils/custom-error.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (data) => {
    data.password = await bcrypt.hash(data.password, saltRounds);

    const savedData = await db.addUser(data);

    return savedData;
};

const authenticateUser = async (data) => {
    const user = await db.getUserByUsername(data.email);
    if (!user) {
        const err = new CustomError(404, "email doesn't exist");
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
            const { error } = validator.registerSchema.validate(data);

            if (error) {
                throw new CustomError(400, error.details[0].message);
            }

            //Checking for Existing Username
            const existingUser = await db.getUserByUsername(data.email);
            if (existingUser) {
                const err = new CustomError(
                    409,
                    "Already an account on this email - you can login"
                );
                throw err;
            }

            //Adding User in Database
            const registered = await registerUser(data);
            delete registered.password;

            //Send Success Message
            res.status(200).json({
                success: true,
                message: "Successfully Registered User",
                data: registered,
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
            const { error } = validator.loginSchema.validate(data);

            if (error) {
                throw new CustomError(400, error.details[0].message);
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
