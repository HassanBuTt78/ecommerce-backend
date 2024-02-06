const Review = require("../model/Review.js");
const Product = require("../model/Product.js");
const CustomError = require("../utils/custom-error.js");

const getReviews = async (options) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const sort = options.sort || "_id-desc";
    const productId = options.productId;
    //Setting filters
    const filter = { productId: productId };
    if (options.rating) {
        filter.rating = options.rating;
    }

    //setting sorting options
    const [sortBy, order] = sort.split("-");
    const sortOptions = {};
    sortOptions[sortBy] = order === "desc" ? -1 : 1;
    const offset = (page - 1) * limit;
    const reviewCount = await Review.countDocuments({ filter });
    const reviews = await Review.find(filter)
        .sort(sortOptions)
        .skip(offset)
        .limit(limit);

    if (!reviews) {
        throw new CustomError(500, "Failed to Retrieve Reviews");
    }
    return {
        reviews: reviews,
        totalReviews: reviewCount,
        page: page,
        limit: limit,
    };
};

const insertReview = async (doc) => {
    const productExist = await Product.countDocuments({ _id: doc.productId });
    if (productExist === 0) {
        throw new CustomError(404, "product doesn't exist");
    }
    const presentReview = await Review.countDocuments({
        userId: doc.userId,
        productId: doc.productId,
    });

    if (presentReview > 0) {
        throw new CustomError(403, "this user already reviewed this product");
    }
    const savedReview = await Review.create(doc);
    if (!savedReview) {
        throw new CustomError(500, "failed to save review - try again");
    }
    return savedReview;
};

module.exports = {
    getReviews,
    insertReview,
};
