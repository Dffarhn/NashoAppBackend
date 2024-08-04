const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { LockStatusMateri } = require("../function/lockedMateri");
const { addMateriToDB, getAllKategoriMateri, GetAllMateriToDB, GetSpesificMateriToDB, AddNewMateriAccessToDB, UpdateMateriToDB, DeleteMateriToDB, GetSpesificKategoriToDB } = require("../models/materiModel");
const CustomError = require("../utils/customError");

//ADMIN
const AddMateriAdmin = async (req, res) => {
  try {
    const data = req.body;
    const newMateriId = await addMateriToDB(data);

    if (!newMateriId) {
      throw new CustomError(500, "Gagal Menambahkan Materi ke Database");
    }

    res.status(201).json({ msg: "Sukses Menambahkan Materi", data: { id: newMateriId } });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const UpdateMateriAdmin = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const UpdateMateriData = await UpdateMateriToDB(data, id);

    if (UpdateMateriData.rowCount == 0) {
      throw new CustomError(500, "Gagal Update materi ke database");
    }

    res.status(200).json({ msg: "Sukses Update materi" });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const DeleteMateriAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await DeleteMateriToDB(id);

    if (deletedRows > 0) {
      res.status(200).json({ message: `Sukses delete` });
    } else {
      throw new CustomError(404, "Tidak ada Data Di hapus");
    }
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

//USER
const getKategoriMateri = async (req, res) => {
  try {
    const userId = req.user.id;
    const kategoriMateri = await getAllKategoriMateri();
    res.status(200).json({ msg: "Sukses Menerima kategori materi", data: kategoriMateri });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const GetAllMateri = async (req, res) => {
  try {
    const { kategori } = req.query;
    const userId = req.user.id;
    console.log(userId);
    let GetAllMateriData = await GetAllMateriToDB(kategori, userId);
    
    if (!GetAllMateriData || GetAllMateriData.length === 0) {
      throw new CustomError(404, "Tidak Ada Materi Ditemukan");
    }
    let spesifickategori = await GetSpesificKategoriToDB(kategori)
    
    //Set Access For User
    GetAllMateriData = GetAllMateriData.map((phase) => ({
      ...phase,
      materi: phase.materi.map((materi) => ({
        ...materi,
        sudah_mengambil: materi.sudah_mengambil !== null,
        quiz:
          materi.quiz === null
            ? null
            : materi.quiz.map((q) => ({
                ...q,
                lulus: q.lulus === "tidak lulus" ? false : true,
              })),
      })),
      ujian: phase.ujian.map((ujian) => ({
        ...ujian,
        nama_ujian: "Teori Dasar " + spesifickategori[0].jenis,
        riwayat: ujian.riwayat
          ? ujian.riwayat.map((r) => ({
              ...r,
              lulus: r.lulus === "tidak lulus" ? false : true,
            }))
          : null,
      })),
    }));

    
    GetAllMateriData = LockStatusMateri(GetAllMateriData)


    spesifickategori[0].materi = GetAllMateriData

    res.status(200).json({ msg: "Sukses Menerima Materi", data: spesifickategori });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const GetSpesificMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const data = {
      id:id,
      user_id : userId
    }

    const GetSpeseificMateriData = await GetSpesificMateriToDB(data);
    if (!GetSpeseificMateriData || GetSpeseificMateriData.length === 0) {
      throw new CustomError(404, "Tidak Ditemukan Materi");
    }
    res.status(200).json({ msg: "Sukses Menerima Materi", data: GetSpeseificMateriData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const AddNewMateriAccessUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id_materi } = req.params;

    const AddNewMateriAccessUserData = await AddNewMateriAccessToDB(userId, id_materi);
    if (!AddNewMateriAccessUserData || AddNewMateriAccessUserData.length === 0) {
      throw new CustomError(500, "Gagal Menambahkan User Access");
    }
    res.status(200).json({ msg: "Sukses Menambahkan User Access", data: AddNewMateriAccessUserData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { AddMateriAdmin, getKategoriMateri, GetAllMateri, GetSpesificMateri, AddNewMateriAccessUser, UpdateMateriAdmin, DeleteMateriAdmin };
