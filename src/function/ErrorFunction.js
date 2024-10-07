const CustomError = require("../utils/customError");

function handleCustomErrorRoute(res, error) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
      data: error.data,
    });
  } else {
    console.error("Unhandled error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

function handleCustomErrorModel(error) {
  if (error instanceof CustomError) {
    throw new CustomError(error.statusCode, error.message);
  } else {
    throw new CustomError(500, "Internal Server Error", error);
  }
}

module.exports = { handleCustomErrorRoute, handleCustomErrorModel };
