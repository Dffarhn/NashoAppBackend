const CustomError = require("../utils/customError");

// errorHandler.js
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let data = err.data || null;

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    data,
  });
};

module.exports = errorHandler;
