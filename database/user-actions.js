const { User } = require("../model/user.js");
const CustomError = require("../utils/custom-error.js");

const addUser = (data, role) => {
    const user = new User({
        username: data.username,
        password: data.password,
        role: role,
    });
    const savedUser = user.save();
    return savedUser;
};

const getUserByUsername = async (username) => {
    const data = await User.findOne({ username: username }).select(
        "username password _id"
    );
    return data;
};
const getUserById = async (id) => {
    const data = await User.findOne({ _id: id }).select("-password -cart");
    return data;
};

const updateUser = async (id, update) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, update, {
        new: true,
    });
    if (!updatedUser) {
        throw new CustomError(500, "Couldn't add Item to cart, try again");
    }
    return updatedUser;
};

module.exports = {
    addUser,
    getUserByUsername,
    updateUser,
    getUserById,
};
