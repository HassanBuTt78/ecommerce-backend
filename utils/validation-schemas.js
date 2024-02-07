const joi = require("joi");

const registerSchema = joi.object({
    firstName: joi.string().max(20).required(),
    lastName: joi.string().max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
    role: joi.string(),
    address: joi
        .object({
            street: joi.string().required(),
            state: joi.string().required(),
            City: joi.string().required(),
            Country: joi.string().required(),
            zip: joi.string().required(),
        })
        .required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
});

const updateUserSchema = joi.object({
    firstName: joi.string().max(20),
    lastName: joi.string().max(20),
    email: joi.string().email(),
    address: joi.object({
        street: joi.string().required(),
        state: joi.string().required(),
        City: joi.string().required(),
        Country: joi.string().required(),
        zip: joi.string().required(),
    }),
});

const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().uri({ scheme: ["http", "https"] }),
    price: joi.number().min(1).required(),
    stock: joi.number().required(),
    category: joi
        .string()
        .valid("electronics", "apparel", "home", "beauty", "outdoors")
        .required(),
});

const productUpdateSchema = joi.object({
    name: joi.string(),
    description: joi.string(),
    image: joi.string().uri({ scheme: ["http", "https"] }),
    price: joi.number().min(1),
    stock: joi.number(),
    category: joi
        .string()
        .valid("electronics", "apparel", "home", "beauty", "outdoors"),
});

const newOrderSchema = joi.object({
    items: joi
        .array()
        .items(
            joi.object({
                _id: joi.alternatives(joi.string(), joi.object()).required(),
                quantity: joi.number().min(1).required(),
            })
        )
        .min(1)
        .required(),
    address: joi
        .object({
            street: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().required(),
            country: joi.string().required(),
            zip: joi.string().required(),
        })
        .required(),
});

const updateOrderSchema = joi.object({
    status: joi
        .string()
        .valid("pending", "processing", "dispatched", "delivered", "canceled"),
    paymentStatus: joi
        .string()
        .valid("pending", "confirmed", "authorized", "failed"),
    paymentMethod: joi.string().valid("cash-on-delivery"),
    items: joi
        .array()
        .items(
            joi.object({
                _id: joi.alternatives(joi.string(), joi.object()).required(),
                quantity: joi.number().min(1).required(),
            })
        )
        .min(1),
});

const reviewSchema = joi.object({
    rating: joi.number().min(1).max(5).required(),
    comment: joi.string().max(500),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateUserSchema,
    productSchema,
    productUpdateSchema,
    newOrderSchema,
    updateOrderSchema,
    reviewSchema,
};
