const { AddUserTODB, LoginUserToDB, GetProfileUserToDB, UpdateProfileUserToDB, UpdatePasswordUserToDB } = require("../models/userModel");
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

      const passData = {
        accessToken: accessToken,
      };
      res.status(201).json({ msg: "Registration successful", data: passData });
    } else {
      throw new CustomError(500, "Internal server error", { reason: "Gagal Pendaftaran User" });
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

      const passData = {
        accessToken: accessToken,
      };
      res.status(200).json({ msg: "Login successful", data: passData });
    } else {
      throw new CustomError(404, "User tidak ditemukan", { reason: "User Tidak Ditemukan Di Database" });
    }
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const Refresh_Access_Token = async (req, res) => {
  try {
    const refreshToken = req.cookies.RefreshT;

    if (!refreshToken) {
      throw new CustomError(401, "Refresh token is missing.");
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

const GetProfileUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const GetProfileUserData = await GetProfileUserToDB(userId);

    if (GetProfileUserData.length == 0) {
      throw new CustomError(404, "User Tidak Ditemukan");
    }

    res.status(200).json({ msg: "Query Sukses", data: GetProfileUserData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const UpdateProfileUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    // Call the update function with user ID and username
    const updatedUserData = await UpdateProfileUserToDB(userId, username);

    if (!updatedUserData) {
      throw new CustomError(500, "Gagal Update Profile");
    }

    res.status(200).json({ msg: "Profile Updated Sukses", data: updatedUserData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const UpdatePasswordUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = req.body;

    const UpdatePasswordUserData = await UpdatePasswordUserToDB(data, userId);

    if (!UpdatePasswordUserData) {
      throw new CustomError(500, "Gagal Ganti Kata Sandi");
    }

    res.status(200).json({ msg: "Ganti Kata Sandi Sukses" });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { RegisterUser, LoginUser, Refresh_Access_Token, GetProfileUser, UpdateProfileUser, UpdatePasswordUser };
