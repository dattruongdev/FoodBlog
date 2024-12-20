const FoodBlog = require("../../model/FoodBlogModel.js");
const CustomError = require("../../Helpers/error/customError.js");

const checkRecipeExist = async (req, res, next) => {
  const { id } = req.params;
  const blog = await FoodBlog.findOne({ _id: id });
  if (!blog) {
    //console.log(`There is no blog with id: ${id} `);
    return next(new CustomError(`There is no blog with id: ${id} `, 400));
  }
  next();
};

module.exports = checkRecipeExist;
