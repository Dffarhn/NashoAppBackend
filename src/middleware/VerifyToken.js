const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const CustomError = require("../utils/customError");
dotenv.config();

const Auth_Access = (req, res, next) => {
  // Get the access token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token part

  if (!token) {
    throw new CustomError(404, "Forbidden Access", "You Dont Have Token");
  }

  // Verify the access token
  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {
      throw new CustomError(403, "Access Invalid", "Your Token is Expired");
    }
    // Token is valid, attach decoded user information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

const Auth_Access_Admin = (req, res, next) => {
  // Get the access token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token part

  if (!token) {
    throw new CustomError(404, "Forbidden Access", "You Dont Have Token");
  }

  // Verify the access token
  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {
      throw new CustomError(403, "Access Invalid", "Your Token is Expired");
    }
    // Token is valid, attach decoded user information to the request object
    req.user = decoded;
    // console.log(req.user.role);
    if (req.user.role != "ac87fd21-2f94-4c1d-a582-ffe691fef450") {
      throw new CustomError(404, "Forbidden Access", "You Are Not Admin");
    }

    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = {
  Auth_Access,
  Auth_Access_Admin,
};
