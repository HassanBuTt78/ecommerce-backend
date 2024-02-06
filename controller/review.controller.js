const db = require("../database/review-actions.js");
const CustomError = require("../utils/custom-error.js");

const reviewController = {
    getReviews: async (req, res, next) => {
        try {
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
        } catch (err) {
            next(err);
        }
    },
    writeReview: async (req, res, next) => {
        try {
            const userId = req.userData._id;
            const username = req.userData.username;
            const productId = req.params.productId;
            const comment = req.body.comment || "";
            const rating = req.body.rating;
            if (!rating) {
                throw new CustomError(400, "Body doesn't have rating");
            }
            const savedReview = await db.insertReview({
                userId,
                username,
                productId,
                comment,
                rating,
            });

            res.json({
                success: true,
                message: "review written successfully",
                data: savedReview,
            });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = reviewController;
