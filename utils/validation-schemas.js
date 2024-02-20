const joi = require("joi");
const categories = ["electronics", "apparel", "home", "beauty", "outdoors"];

const validationSchemas = {
    registor: joi.object({
        firstName: joi.string().max(20).required(),
        lastName: joi.string().max(20),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
        address: joi.object({
            street: joi.string().required(),
            state: joi.string().required(),
            City: joi.string().required(),
            Country: joi.string().required(),
            zip: joi.string().required(),
        }),
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    }),
    userUpdate: joi.object({
        firstName: joi.string().max(20),
        lastName: joi.string().max(20),
        verified: joi.bool(),
        email: joi.string().email(),
        address: joi.object({
            street: joi.string().required(),
            state: joi.string().required(),
            City: joi.string().required(),
            Country: joi.string().required(),
            zip: joi.string().required(),
        }),
    }),
    updatePassword: joi.object({
        password: joi.string().min(8).max(30).required(),
    }),
    resetPassByEmail: joi.object({
        email: joi.string().email().required(),
    }),
    productCreation: joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().uri({ scheme: ["http", "https"] }),
        price: joi.number().min(1).required(),
        stock: joi.number().required(),
        category: joi
            .string()
            .valid(...categories)
            .required(),
    }),
    productUpdate: joi.object({
        name: joi.string(),
        description: joi.string(),
        image: joi.string().uri({ scheme: ["http", "https"] }),
        price: joi.number().min(1),
        stock: joi.number(),
        category: joi.string().valid(...categories),
    }),
    orderCreation: joi.object({
        items: joi
            .array()
            .items(
                joi.object({
                    _id: joi
                        .alternatives(joi.string(), joi.object())
                        .required(),
                    quantity: joi.number().min(1).required(),
                })
            )
            .min(1),
        address: joi
            .object({
                street: joi.string().required(),
                city: joi.string().required(),
                state: joi.string().required(),
                country: joi.string().required(),
                zip: joi.string().required(),
            })
            .required(),
    }),
    orderUpdate: joi.object({
        status: joi
            .string()
            .valid(
                "pending",
                "processing",
                "dispatched",
                "delivered",
                "canceled"
            ),
        paymentStatus: joi
            .string()
            .valid("pending", "confirmed", "authorized", "failed"),
        paymentMethod: joi.string().valid("cash-on-delivery"),
        items: joi
            .array()
            .items(
                joi.object({
                    _id: joi
                        .alternatives(joi.string(), joi.object())
                        .required(),
                    quantity: joi.number().min(1).required(),
                })
            )
            .min(1),
    }),
    reviewCreation: joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().max(500),
    }),
    verification: joi.object({
        token: joi.string().required(),
        code: joi.string().length(6).required(),
    }),
};

module.exports = validationSchemas;
