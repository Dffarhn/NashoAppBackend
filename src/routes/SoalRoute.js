const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { AddSoalQuizToMateriToDB, AddSoalUjianToMateriToDB, UpdateSoalToDB, DeleteSoalToDB } = require("../models/soalModel");
const CustomError = require("../utils/customError");

const AddSoalQuiz = async (req, res) => {
  try {
    const data = req.body;
    const { id_materi } = req.params;

    data.id_materi = id_materi;

    const AddSoalQuizData = await AddSoalQuizToMateriToDB(data);

    if (!AddSoalQuizData) {
      throw new CustomError(500, "Failed To Call Database", "Ulangi");
    }

    res.status(201).json({ msg: "Soal Added To Database", data: AddSoalQuizData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const AddSoalUjian = async (req, res) => {
  try {
    const data = req.body;

    const AddSoalUjianData = await AddSoalUjianToMateriToDB(data);

    if (!AddSoalUjianData) {
      throw new CustomError(500, "Failed To Call Database", "Ulangi");
    }

    res.status(201).json({ msg: "Soal Added To Database", data: AddSoalUjianData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const UpdateSoalRoute = async (req, res) => {
  try {
    const { id_soal } = req.params;
    let data = req.body;
    data.id_soal = id_soal;

    await UpdateSoalToDB(data);

    // Send a successful response
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
const DeleteSoalRoute = async (req, res) => {
  try {
    const { id_soal } = req.params;

    await DeleteSoalToDB(id_soal);

    // Send a successful response
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};
module.exports = { AddSoalQuiz, AddSoalUjian, UpdateSoalRoute,DeleteSoalRoute };
