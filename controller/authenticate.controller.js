const db = require("../database/user-actions.js");
const verificationdb = require("../database/verification-actions.js");
const { makeToken } = require("../utils/jwt.js");
const CustomError = require("../utils/custom-error.js");
const mailer = require("../utils/mailer.js");

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
    signup: async (req, res) => {
        const data = req.body;

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

        const token = await verificationdb.createToken(registered._id);
        const mail = mailer.writeEmailVerification(registered.email, token);
        await mailer.sendEmail(mail);

        //Send Success Message
        res.status(200).json({
            success: true,
            message: "Successfully Registered User",
            data: registered,
        });
    },
    //
    //
    login: async (req, res) => {
        const data = req.body;
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
    },
    emailVerification: async (req, res) => {
        const data = await db.updateUser(req.tokenData.userId, {
            verified: true,
        });

        return res.status(200).json({
            success: true,
            message: "Your email address is verified",
            data: data,
        });
    },
    changePassword: async (req, res) => {
        const data = await db.updateUser(req.tokenData.userId, {
            password: await bcrypt.hash(req.body.password, saltRounds),
        });
        return res.status(200).json({
            success: true,
            message: "Your password has been changed",
            data: data,
        });
    },
    resetPassword: async (req, res) => {
        const userData = await db.getUserByUsername(req.body.email);
        if (!userData) {
            throw new CustomError(404, "no account on this email");
        }
        const userId = userData._id;
        const token = await verificationdb.createToken(userId);
        const mail = mailer.writeChangePassword(userData.email, token);
        await mailer.sendEmail(mail);

        return res.status(200).json({
            success: true,
            message: "password reseting link has been sent on your email",
            data: {},
        });
    },
};

module.exports = authController;
