// middlewares/handleValidationErrors.js
const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError(400, "Your Data Not Valid", errors.array()[0].msg);
  }
  next();
};

module.exports = { handleValidationErrors };
