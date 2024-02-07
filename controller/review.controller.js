const db = require("../database/review-actions.js");
const reviewController = {
    getReviews: async (req, res) => {
        req.query.productId = req.params.productId;
        const reviewsData = await db.getReviews(req.query);
        res.json({
            success: true,
            message: "successfully retrieved reviews",
            data: {
                limit: reviewsData.limit,
                page: reviewsData.page,
                reviewCount: reviewsData.totalReviews,
                reviews: reviewsData.reviews,
            },
        });
    },
    writeReview: async (req, res) => {
        const userId = req.userData._id;
        const productId = req.params.productId;

        const savedReview = await db.insertReview({
            userId,
            productId,
            comment: req.body.comment || "",
            rating: req.body.rating,
        });

        res.json({
            success: true,
            message: "review written successfully",
            data: savedReview,
        });
    },
};

module.exports = reviewController;
