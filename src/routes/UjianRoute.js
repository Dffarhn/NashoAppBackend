const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetUjianByPhaseToDB, AddTakeUjianUserToDB, GetNilaiUjianToDB } = require("../models/ujianModel");
const CustomError = require("../utils/customError");

const GetUjianByPhase = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategori_materi } = req.body;

    const data = {
      phase: id,
      kategori_materi: kategori_materi,
    };

    const GetUjianByPhaseData = await GetUjianByPhaseToDB(data);

    if (!GetUjianByPhaseData || GetUjianByPhaseData.length == 0) {
      throw new CustomError(404, "Ujian Not Found", "Check Your Phase or Kategori");
    }
    res.status(200).json({ msg: "Query Successfully", data: GetUjianByPhaseData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const AddUjianUserTake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { kategori_materi } = req.body;

    const data = {
      phase: id,
      id_user: userId,
      kategori_materi: kategori_materi,
    };

    const UserTakeQuizData = await AddTakeUjianUserToDB(data);
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


const GetNilaiUjian = async (req, res) => {
  try {
    const { id_mengambil_ujian } = req.params;
    const userId = req.user.id;

    const data = {
      id_mengambil_ujian: id_mengambil_ujian,
      id_user: userId,
    };

    const GetNilaiUjianData = await GetNilaiUjianToDB(data);

    if (!GetNilaiUjianData || GetNilaiUjianData.length == 0) {
      throw new CustomError(404, "History Not Found", "Check Your id materi");
    }

    const payload = {
      nilai: GetNilaiUjianData,
    };
    res.status(200).json({ msg: "Query Successfully", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { GetUjianByPhase, AddUjianUserTake,GetNilaiUjian };
