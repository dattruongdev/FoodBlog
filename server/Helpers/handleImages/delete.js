const { dirname, join } = require("path");
const { unlink } = require("fs");

const imageDelete = (req, image) => {
  const rootDir = dirname(require.main.filename);

  filePath = join(rootDir, `public/postImages/${image}`);

  unlink(filePath, (err) => {
    if (err) throw err;
    console.log("Image deleted");
  });
};

module.exports = imageDelete;
