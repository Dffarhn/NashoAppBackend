const { AddUserTODB, LoginUserToDB } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const { handleCustomErrorRoute } = require("../function/ErrorFunction");


const RegisterUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await AddUserTODB(data);

    if (newUser) {
      const payload = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_TOKEN);
      const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: "1d" });

      // res.cookie("RefreshT", refreshToken, {
      //   httpOnly: true,
      //   // sameSite: "none",
      //   // secure: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

      const passData = {
        accessToken : accessToken
       };
      res.status(201).json({ msg: "Registration successful", data: passData });
    } else {
      throw new CustomError(500, "Internal server error", { reason: "Failed to register user" });
    }
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const data = req.body;
    const searchingUser = await LoginUserToDB(data);

    if (searchingUser) {
      const payload = { id: searchingUser.id, username: searchingUser.username, email: searchingUser.email, role: searchingUser.role };
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_TOKEN);
      const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: "1d" });

      // res.cookie("RefreshT", refreshToken, {
      //   httpOnly: true,
      //   sameSite: "none",
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000
        
      // });

      const passData = {
        accessToken : accessToken
       };
      res.status(200).json({ msg: "Login successful", data: passData });
    } else {
      throw new CustomError(404, "User tidak ditemukan", { reason: "User not found in the database" });
    }
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};


const Refresh_Access_Token = async (req, res) => {
  try {
    const refreshToken = req.cookies.RefreshT

    if (!refreshToken) {
      throw new CustomError(401,"Refresh token is missing.")
    }
     // Verify the access token
    jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        throw new CustomError(403, "Invalid Signature", "Direct To Login");
      }
      // Token is valid, attach decoded user information to the request object
      const payload = { id: decoded.id, username: decoded.username, email: decoded.email };
  
      // Generate a new access token
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {
        expiresIn: "10m",
      });
  
      return res.status(200).send({ msg: "Refresh successful", token: accessToken });

    });

    
  } catch (error) {
    console.error("Error in Refresh_Access_Token:", error);
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { RegisterUser, LoginUser, Refresh_Access_Token };
