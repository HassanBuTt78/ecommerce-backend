const db = require("../database/product-actions.js");
const CustomError = require("../utils/custom-error.js");
const productController = {
    getProducts: async (req, res, next) => {
        try {
            const productsData = await db.getProducts(req.query);
            res.json({
                success: true,
                message: "Product Query Successful",
                data: {
                    page: productsData.page,
                    limit: productsData.limit,
                    productCount: productsData.productCount,
                    products: productsData.products,
                },
            });
        } catch (err) {
            next(err);
        }
    },
    getProductDetails: async (req, res, next) => {
        try {
            const productId = req.params.productId;
            const productDetails = await db.getProductDetails(productId);
            res.json({
                success: true,
                message: "Product Details",
                data: productDetails,
            });
        } catch (err) {
            next(err);
        }
    },
    makeProduct: async (req, res, next) => {
        try {
            const body = req.body;
            if (
                !body.name ||
                !body.description ||
                !body.price ||
                !body.stock ||
                !body.category
            ) {
                const err = new CustomError(400, "invalid body");
                throw err;
            }
            const dataSaved = await db.addProduct(body);
            res.json({
                success: true,
                message: "New Product Successfully Added",
                data: dataSaved,
            });
        } catch (err) {
            next(err);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const body = req.body;
            const productId = req.params.productId;
            if ("_id" in body) {
                delete body._id;
            }
            const updatedProduct = await db.updateProduct(productId, body);
            res.json({
                success: true,
                message: "Product has been updated",
                data: updatedProduct,
            });
        } catch (err) {
            next(err);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const productId = req.params.productId;
            const deleteCount = await db.deleteProduct(productId);
            res.json({
                success: true,
                message: "Product has been deleted",
                data: deleteCount,
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = productController;
