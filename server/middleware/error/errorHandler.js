const errorHandler = (err, req, res, next) => {
  console.log(
    "Custom Error Handler => ",
    err.name,
    err.message,
    err.statusCode
  );
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

module.exports = errorHandler;
