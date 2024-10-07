const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetPembahasanQuizToDB, GetPembahasanUjianToDB } = require("../models/pembahasanModel");
const CustomError = require("../utils/customError");

const GetPembahasanUjian = async (req, res) => {
  try {
    const { id_mengambil_ujian } = req.params;
    const userId = req.user.id;
    const data = {
        id_user : userId,
        id_mengambil_ujian: id_mengambil_ujian
    }

    const GetPembahasanUjianData = await GetPembahasanUjianToDB(data);

    if (GetPembahasanUjianData.length == 0) {
      throw new CustomError(404, "Pembahasan Tidak Ditemukan");
    }

    res.status(200).json({ msg: "Sukses Mendapatkan Pembahasan", data: GetPembahasanUjianData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const GetPembahasanQuiz = async (req, res) => {
  try {
    const { id_mengambil_quiz } = req.params;
    const userId = req.user.id;

    const data = {
        id_user : userId,
        id_mengambil_quiz: id_mengambil_quiz
    }

    const GetPembahasanQuizData = await GetPembahasanQuizToDB(data);

    if (GetPembahasanQuizData.length == 0) {
      throw new CustomError(404, "Pembahasan Tidak Ditemukan");
    }

    res.status(200).json({ msg: "Sukses Mendapatkan Pembahasan", data: GetPembahasanQuizData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};


module.exports = {GetPembahasanQuiz,GetPembahasanUjian}