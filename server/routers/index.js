const { Router } = require("express");
const recipeRoute = require("./recipe.js");

const router = Router();
router.use("/recipe", recipeRoute);

module.exports = router;
