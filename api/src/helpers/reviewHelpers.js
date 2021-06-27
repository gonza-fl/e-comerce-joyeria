const {
  Review,
} = require('../models/index');

const searchReview = (reviewId, userId) => {
  const review = Review.findOne({
    where: {
      id: reviewId,
      userId,
    },
  });
  return review;
};

module.exports = {
  searchReview,
};
