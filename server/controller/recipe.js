const FoodBlog = require("../model/FoodBlogModel.js");
const sharp = require("sharp");

const editBlog = async (req, res) => {
  const { title, description, content, oldImages } = req.body;
  const { id } = req.params;

  const blog = await FoodBlog.findOne({ _id: id });

  // console.log(req.files);

  //oldImages will be a string if return 1 image, otherwise an array of strings, or undefined if none
  let oldImagesArray = [];
  if (typeof oldImages === "string") {
    oldImagesArray.push(oldImages);
  } else {
    oldImagesArray = oldImages;
  }

  blog.title = title;
  blog.description = description;
  blog.content = content;
  const newImages = [];

  //Compress new adding images
  for (let i = 0; i < req.files.length; i++) {
    const buffer = req.files[i].buffer;
    const imgCompressed = await sharp(buffer).png({ quality: 20 }).toBuffer();
    const imgCompressedBase64 = imgCompressed.toString("base64");
    newImages.push("data:image/png;base64," + imgCompressedBase64);
  }

  //Append new images into database if any
  if (Array.isArray(oldImagesArray) && newImages.length > 0) {
    blog.images = oldImagesArray.concat(newImages);
  } else blog.images = oldImagesArray || newImages || [];

  blog.updatedDate = Date.now();

  await blog.save();

  return res.status(200).json({
    success: true,
    // data: blog,
  });
};

const detailBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await FoodBlog.findOne({ _id: id }); //.populate("author");

  return res.status(200).json({
    success: true,
    data: blog,
  });
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  await FoodBlog.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "Blog deleted succesfully ",
  });
};

module.exports = {
  editRecipe: editBlog,
  detailRecipe: detailBlog,
  deleteRecipe: deleteBlog,
};
