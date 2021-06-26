const {
  Review,
} = require('../models/index');

const searchReview = (reviewId) => {
  const review = Review.findOne({
    where: {
      id: reviewId,
    },
  });
  return review;
};

module.exports = {
  searchReview,
};
