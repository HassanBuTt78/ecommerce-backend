const { User } = require("../model/user.js");
const Product = require("../model/Product.js");
const CustomError = require("../utils/custom-error.js");

const getUserCart = async (id) => {
    const data = await User.findOne({ _id: id }).select("cart");
    if (!data) {
        throw new CustomError(500, "Server ran into a problem");
    }
    return data.cart;
};

const addItemToCart = async (obj) => {
    const productDetails = await Product.findById(obj.productId);
    if (!productDetails) {
        throw new CustomError(500, "server ran into a problem");
    }
    if (productDetails.stock < obj.quantity) {
        throw new CustomError(
            200,
            "Item is out of stock - reduce quantity or try again"
        );
    }
    const user = await User.findById(obj.userId);

    const existingCartItemIndex = user.cart.findIndex((item) => {
        return String(item._id) === String(productDetails._id);
    });

    if (existingCartItemIndex !== -1) {
        throw new CustomError(200, "item is already in cart");
    } else {
        user.cart.push({
            _id: productDetails._id,
            quantity: obj.quantity,
        });
    }
    const updatedUser = await user.save();
    if (!updatedUser) {
        throw new CustomError(500, "Failed to insert Items Cart, try again");
    }
    return updatedUser;
};

const updateCartItem = async (obj) => {
    const user = await User.findById(obj.userId);

    const itemIndex = user.cart.findIndex(
        (item) => String(item._id) === String(obj.productId)
    );
    if (itemIndex === -1) {
        throw new CustomError(404, "Item is not in Cart");
    }
    user.cart[itemIndex].quantity = obj.quantity;
    const savedUser = await user.save();
    return savedUser;
};

const deleteCartItem = async (obj) => {
    const user = await User.findById(obj.userId);

    const itemIndex = user.cart.findIndex(
        (item) => String(item._id) === String(obj.productId)
    );
    if (itemIndex === -1) {
        return user;
    }
    user.cart.splice(itemIndex, 1);
    const savedUser = await user.save();
    return savedUser;
};

const emptyCart = async (userId) => {
    const user = await User.findById(userId);
    user.cart = [];
    const savedUser = await user.save();
    return savedUser;
};

module.exports = {
    getUserCart,
    addItemToCart,
    updateCartItem,
    deleteCartItem,
    emptyCart,
};
