const multer = require("multer");
const path = require("path");

// const storage_old = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const rootDir = path.dirname(process.cwd());
//     cb(null, path.join(rootDir, "Server/public/postImages"));
//   },

//   filename: function (req, file, cb) {
//     req.savedStoryImage =
//       "image_" +
//       new Date().toISOString().replace(/:/g, "-") +
//       file.originalname;

//     cb(null, req.savedStoryImage);
//   },
// });

const storage = multer.memoryStorage();

const imageUpload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
}); //= multer({ storage });

module.exports = imageUpload;
