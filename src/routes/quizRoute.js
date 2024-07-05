const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetAllQuizMateriToDB } = require("../models/quizModel");
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

module.exports = {GetAllQuizMateri}
