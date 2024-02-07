const Order = require("../model/Order.js");
const productActions = require("./product-actions.js");
const CustomError = require("../utils/custom-error.js");

const makeOrder = async (params) => {
    let i = 0;
    const items = params.items;
    const orderItems = [];

    for (const item of items) {
        const product = await productActions.getProductDetails(item._id);
        if (product.stock < item.quantity) {
            throw new CustomError(200, `${product.name} is out of stock`);
        }
        product.stock = product.stock - item.quantity;
        const savedProduct = await product.save();
        if (!savedProduct) {
            throw new CustomError(500, "Server ran into a problem");
        }
        const orderItem = {
            product: items[i]._id,
            quantity: items[i].quantity,
            total: product.price * item.quantity,
        };
        orderItems.push(orderItem);
        i++;
    }

    const newOrder = {
        userId: params.userId,
        items: orderItems,
        shipping: {
            address: params.address,
        },
    };
    const createdOrder = await Order.create(newOrder);
    if (!createdOrder) {
        throw new CustomError(500, "Server ran into a problem");
    }
    return createdOrder;
};

const getAllOrdersOf = async (userId) => {
    const orders = await Order.find({ userId: userId }).sort({ _id: -1 });
    if (!orders) {
        throw new CustomError(500, "server ran into a problem");
    }
    return orders;
};

const orderDetails = async (orderId, userId) => {
    const order = await Order.findOne({
        userId: userId,
        _id: orderId,
    }).populate("items.product", "name price image");
    if (!order) {
        throw new CustomError(500, "couldn't find your order - try again");
    }
    return order;
};

const updateOrder = async (orderId, update) => {
    const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        update,
        { new: true }
    );
    if (!updatedOrder) {
        throw new CustomError(
            500,
            "Failed to Update Order - Check Order Id and Try again"
        );
    }
    return updatedOrder;
};

module.exports = {
    makeOrder,
    getAllOrdersOf,
    orderDetails,
    updateOrder,
};
