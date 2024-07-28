const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetAllQuizMateriToDB, AddTakeQuizUserToDB, GetNilaiQuizToDB, GetAllQuizMateriAdminToDB } = require("../models/quizModel");
const CustomError = require("../utils/customError");

const GetAllQuizMateri = async (req, res) => {
  try {
    const { id_materi } = req.params;

    const GetAllQuizMateriData = await GetAllQuizMateriToDB(id_materi);

    if (!GetAllQuizMateriData || GetAllQuizMateriData.length == 0) {
      throw new CustomError(404, "Quiz Tidak Ditemukan", "Check Id Materi Anda");
    }
    res.status(200).json({ msg: "Sukses Menerima Data", data: GetAllQuizMateriData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const GetAllQuizMateriAdmin = async (req, res) => {
  try {
    const { id_materi } = req.params;

    const GetAllQuizMateriData = await GetAllQuizMateriAdminToDB(id_materi);

    if (!GetAllQuizMateriData || GetAllQuizMateriData.length == 0) {
      throw new CustomError(404, "Quiz Tidak Ditemukan", "Check Id Materi Anda");
    }
    res.status(200).json({ msg: "Sukses Menerima Data", data: GetAllQuizMateriData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const AddQuizUserTake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id_materi } = req.params;

    const data = {
      id_materi: id_materi,
      id_user: userId,
    };

    const UserTakeQuizData = await AddTakeQuizUserToDB(data);
    if (!UserTakeQuizData || UserTakeQuizData.length == 0) {
      throw new CustomError(404, "Quiz Tidak Ditemukan", "Check Id Materi Anda");
    }

    const payload = {
      id_mengambil_quiz: UserTakeQuizData,
    };
    res.status(201).json({ msg: "Sukses Menerima Data", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const GetNilaiQuiz = async (req, res) => {
  try {
    const { id_mengambil_quiz } = req.params;
    const userId = req.user.id;

    const data = {
      id_mengambil_quiz: id_mengambil_quiz,
      id_user: userId,
    };

    const GetNilaiQuizData = await GetNilaiQuizToDB(data);

    if (!GetNilaiQuizData || GetNilaiQuizData.length == 0) {
      throw new CustomError(404, "Tidak Ditemukan History", "Check Id Materi Anda");
    }

    const payload = {
      quiz: GetNilaiQuizData,
    };
    res.status(200).json({ msg: "Sukses Menerima Data", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { GetAllQuizMateri, AddQuizUserTake, GetNilaiQuiz,GetAllQuizMateriAdmin };
