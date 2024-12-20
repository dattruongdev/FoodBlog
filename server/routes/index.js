const BlogRoutes = require("../routers/BlogsRoute");
const userRoutes = require("../routers/userRoutes");
const route = require("../routers/index.js");
const ReviewRoutes = require("../routers/ReviewRoute");

const router = require('express').Router()

router.get('/haha', (req, res) => {
  res.send('haha')
})

router.use("/api/v1/blogs", BlogRoutes);
router.use("/auth", userRoutes);
router.use("/", route);
router.use("/api/v1/reviews", ReviewRoutes);

module.exports = router
