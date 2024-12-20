const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth.js')

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controller/reviewController");

router.get("/:blogId", getAllReviews);
router.post("/", createReview);
router.put("/:id", requireAuth, updateReview);
router.delete("/:id", requireAuth, deleteReview);

//:id = route param
//?name=nam&age=24 query param
module.exports = router;
