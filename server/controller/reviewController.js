const mongoose = require("mongoose");
const Review = require("../model/ReviewModel");
async function createReview(req, res, next) {
  const { userId, blogId, content, rating, date } = req.body;
  const review = new Review({
    userId: userId,
    blogId: blogId,
    content: content,
    rating: rating,
    date: date,
  });
  try {
    const result = await review.save();
    console.log("Result: ", result);
    res.status(200).json({
      success: true,
      review: review,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllReviews(req, res, next) {
  let { blogId } = req.params;
  const { pages } = req.query;
  console.log(req.query);
  blogId = new mongoose.Types.ObjectId(blogId);

  try {
    const reviews = await Review.find({ blogId: blogId })
      .limit(3 * pages)
      .populate({
        path: "userId",
        select: "name avatar",
      });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
}

// async function getReviewsFromBlog(req, res, next) {
//   const { blogId } = req.params;
//   try {
//     const reviews = await Review.find({ blogId: blogId });
//     res.status(200).json({
//       success: true,
//       reviews,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

async function updateReview(req, res, next) {
  const { id } = req.params;
  const { content, rating } = req.body;
  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { content, rating },
      { new: true }
    );
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
