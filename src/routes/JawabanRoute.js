const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { CekJawabanUserToDB, CekJawabanUjianUserToDB } = require("../models/jawabanModel");

const CekJawabanUser = async (req, res) => {
  try {
    const data = req.body;

    const { id_mengambil_quiz } = req.params;

    data.id_mengambil_quiz = id_mengambil_quiz;

    const CekJawabanUserData = await CekJawabanUserToDB(data);

    const payload = {
      hasil: CekJawabanUserData
    }

    res.status(200).json({ msg: "Jawaban Berhasil DiPeriksa", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const CekJawabanUserUjian = async (req, res) => {
  try {
    const data = req.body;

    const { id_mengambil_ujian } = req.params;

    data.id_mengambil_ujian = id_mengambil_ujian;

    const CekJawabanUserData = await CekJawabanUjianUserToDB(data);

    const payload = {
      hasil: CekJawabanUserData
    }

    res.status(200).json({ msg: "Jawaban Berhasil DiPeriksa", data: payload });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { CekJawabanUser,CekJawabanUserUjian };
