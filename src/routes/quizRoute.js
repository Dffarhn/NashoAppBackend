const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetAllQuizMateriToDB, AddTakeQuizUserToDB, GetNilaiQuizToDB } = require("../models/quizModel");
const CustomError = require("../utils/customError");

const GetAllQuizMateri = async (req, res) => {
  try {
    const { id_materi } = req.params;

    const GetAllQuizMateriData = await GetAllQuizMateriToDB(id_materi);

    if (!GetAllQuizMateriData || GetAllQuizMateriData.length == 0) {
      throw new CustomError(404, "Quiz Not Found", "Check Your Id Materi");
    }
    res.status(200).json({ msg: "Query Successfully", data: GetAllQuizMateriData });
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
      throw new CustomError(404, "Quiz Not Found", "Check Your Id Materi");
    }

    const payload = {
      id_mengambil_quiz: UserTakeQuizData,
    };
    res.status(201).json({ msg: "Query Successfully", data: payload });
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
      throw new CustomError(404, "History Not Found", "Check Your id materi");
    }

    const payload = {
      nilai: GetNilaiQuizData,
    };
    res.status(200).json({ msg: "Query Successfully", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { GetAllQuizMateri, AddQuizUserTake, GetNilaiQuiz };
