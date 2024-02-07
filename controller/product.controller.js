const db = require("../database/product-actions.js");
const productController = {
    getProducts: async (req, res) => {
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
    },
    getProductDetails: async (req, res) => {
        const productId = req.params.productId;
        const productDetails = await db.getProductDetails(productId);
        res.json({
            success: true,
            message: "Product Details",
            data: productDetails,
        });
    },
    makeProduct: async (req, res) => {
        const body = req.body;
        const dataSaved = await db.addProduct(body);
        res.json({
            success: true,
            message: "New Product Successfully Added",
            data: dataSaved,
        });
    },
    updateProduct: async (req, res) => {
        const body = req.body;
        const productId = req.params.productId;
        const updatedProduct = await db.updateProduct(productId, body);
        res.json({
            success: true,
            message: "Product has been updated",
            data: updatedProduct,
        });
    },
    deleteProduct: async (req, res) => {
        const productId = req.params.productId;
        const deleteCount = await db.deleteProduct(productId);
        res.json({
            success: true,
            message: "Product has been deleted",
            data: deleteCount,
        });
    },
};

module.exports = productController;
