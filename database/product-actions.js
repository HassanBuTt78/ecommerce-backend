const Product = require("../model/Product.js");
const CustomError = require("../utils/custom-error.js");
const { makeSearchRegex } = require("../utils/strings.js");

const addProduct = async (doc) => {
    const product = await Product.create(doc);
    if (!product) {
        throw new CustomError(500, "server ran into a problem");
    }
    return product;
};

const getProducts = async (options) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const sort = options.sort || "_id-desc";

    //Setting filters
    const filter = {};
    if (options.search) {
        filter.name = await makeSearchRegex(options.search);
    }
    if (options.category) {
        filter.category = options.category;
    }
    //setting sorting options
    const [sortBy, order] = sort.split("-");
    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;
    const offset = (page - 1) * limit;
    const productCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort(sortOptions)
        .skip(offset)
        .limit(limit);

    if (!products) {
        throw new CustomError(500, "server ran into a problem");
    }
    return {
        products: products,
        productCount: productCount,
        page: page,
        limit: limit,
    };
};

const updateProduct = async (id, update) => {
    const validData = await Product.validate(update);
    if (!validData) {
        throw new CustomError(400, "Invalid Body");
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, update, {
        new: true,
    });
    if (!updatedProduct) {
        throw new CustomError(500, "server ran into a problem");
    }
    return updatedProduct;
};

const getProductDetails = async (id) => {
    const productDetails = await Product.findById(id);
    if (!productDetails) {
        throw new CustomError(500, "Server ran into a problem");
    }
    return productDetails;
};

const deleteProduct = async (id) => {
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (!deletedProduct || !("deletedCount" in deletedProduct)) {
        throw new CustomError(500, "server ran into a problem");
    }
    return deletedProduct;
};

module.exports = {
    addProduct,
    updateProduct,
    getProductDetails,
    deleteProduct,
    getProducts,
};
