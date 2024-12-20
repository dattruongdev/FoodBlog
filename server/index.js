const express = require("express");
const BlogRoutes = require("./routers/BlogsRoute");
const userRoutes = require("./routers/userRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error/errorHandler.js");
const route = require("./routers/index.js");
const ReviewRoutes = require("./routers/ReviewRoute");
const path = require("path");
const apiroutes = require("./routes/index.js");

//create the server
const app = express();

app.use(cors());

//use middleware
app.use(express.json({ limit: "100mb" }));

app.use(morgan("combined")); // 'combined' is one of the predefined log formats

//Routes
app.use("/api/v1/blogs", BlogRoutes);
app.use("/auth", userRoutes);
app.use("/api", route);
app.use("/api/v1/reviews", ReviewRoutes);
app.use(errorHandler);

//Error handling middleware
app.use((error, req, res, next) => {
  res.status(400).json({ success: false, error: error.message });
});

//connecting to DB
mongoose
  //.connect(process.env.MONGO_URI, { dbName: process.env.DATABASE_NAME })
  .connect(process.env.URI)
  .then(() => {
    //make the server listening on port 4567
    app.listen(process.env.PORT, () => {
      console.log("connect & listen on port:", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  })
  .catch((e) => {
    console.log(e);
  });

module.export = app;
