const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { GetUjianByPhaseToDB, AddTakeUjianUserToDB, GetNilaiUjianToDB, GetUjianByPhaseAdminToDB } = require("../models/ujianModel");
const CustomError = require("../utils/customError");

const GetUjianByPhase = async (req, res) => {
  try {
    const { id } = req.params;

    const GetUjianByPhaseData = await GetUjianByPhaseToDB(id);

    if (!GetUjianByPhaseData || GetUjianByPhaseData.length == 0) {
      throw new CustomError(404, "Ujian Tidak Ditemukan", "Cek id Ujian Anda");
    }
    res.status(200).json({ msg: "Query Sukses", data: GetUjianByPhaseData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const GetUjianByPhaseAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const GetUjianByPhaseData = await GetUjianByPhaseAdminToDB(id);

    if (!GetUjianByPhaseData || GetUjianByPhaseData.length == 0) {
      throw new CustomError(404, "Ujian Tidak Ditemukan", "Cek id Ujian Anda");
    }
    res.status(200).json({ msg: "Query Sukses", data: GetUjianByPhaseData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const AddUjianUserTake = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { kategori_materi,phase } = req.body;

    const data = {
      id: id,
      phase: phase,
      id_user: userId,
      kategori_materi: kategori_materi,
    };

    const UserTakeQuizData = await AddTakeUjianUserToDB(data);
    if (!UserTakeQuizData || UserTakeQuizData.length == 0) {
      throw new CustomError(404, "Ujian Tidak Ditemukan", "Cek id ujian, kategori, dan phase");
    }

    const payload = {
      id_mengambil_quiz: UserTakeQuizData,
    };
    res.status(201).json({ msg: "Query Sukses", data: payload });
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
      throw new CustomError(404, "History Tidak Ditemukan", "Cek Id Materi Anda");
    }

    const payload = {
      ujian: GetNilaiUjianData,
    };
    res.status(200).json({ msg: "Query Sukses", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { GetUjianByPhase, AddUjianUserTake,GetNilaiUjian,GetUjianByPhaseAdmin };
