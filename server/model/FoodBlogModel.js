const { SchemaTypes } = require("mongoose");
const { Schema, ...mongoose } = require("mongoose");
const Review = require("./ReviewModel");

const FoodBlogSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  duration: Number,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  images: [{ type: String }],
  content: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// FoodBlogSchema.pre("save", function (next) {
//   if (!(this.isModified("Name") || this.isModified("Description"))) {
//     next();
//   }

//   this.slug = this.makeSlug();
//   next();
// });

FoodBlogSchema.pre("deleteOne", async function (next) {
  const blog = await FoodBlog.findById(this._id);

  await Review.deleteMany({
    blogId: blog,
  });
});

const FoodBlog = mongoose.model("FoodBlog", FoodBlogSchema);

module.exports = FoodBlog;
