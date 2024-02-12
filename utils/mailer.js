const nodemailer = require("nodemailer");
const CustomError = require("./custom-error.js");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const writeEmailVerification = (recipient, token) => {
    return {
        from: process.env.EMAIL,
        to: recipient,
        subject: "Verification Email from Ecom_backend",
        text: `
Please verify your email to be able to use app.        
        
Just press the link below to verify your email. We’ll have you up and running in no time.
http://localhost:4000/api/v1/auth/verify?token=${token._id}&code=${token.code} (link is valid for 24 hours)
                
If you did not make this request then please ignore this email.\n`,
    };
};

const writeChangePassword = (recipient, token) => {
    return {
        from: process.env.EMAIL,
        to: recipient,
        subject: "Your Password Reset Link for ecom account",
        text: `
Trouble signing in?        
        
Just press the link below and follow the instructions. We’ll have you up and running in no time.
http://localhost:4000/api/v1/auth/reset-password?token=${token._id}&code=${token.code} (link is valid for 24 hours)
        
If you did not make this request then please ignore this email.\n`,
    };
};

const sendEmail = async (mail) => {
    const sentData = await transporter.sendMail(mail);
    if (!sentData) {
        throw new CustomError(500, "Error sending the Verification Email");
    }
    return true;
};

module.exports = {
    sendEmail,
    writeEmailVerification,
    writeChangePassword,
};
