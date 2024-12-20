const { Schema, ...mongoose } = require("mongoose");
const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  blogId: Schema.Types.ObjectId,
  content: String,
  rating: Number,
  date: Date,
});

module.exports = mongoose.model("Review", ReviewSchema);
