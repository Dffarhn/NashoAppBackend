const { handleCustomErrorRoute } = require("../function/ErrorFunction");
const { addMateriToDB, getAllKategoriMateri, GetAllMateriToDB, GetSpesificMateriToDB, AddNewMateriAccessToDB, UpdateMateriToDB } = require("../models/materiModel");
const CustomError = require("../utils/customError");

//ADMIN
const AddMateriAdmin = async (req, res) => {
  try {
    const data = req.body;
    const newMateriId = await addMateriToDB(data);

    if (!newMateriId) {
      throw new CustomError(500, "Failed to add materi to database");
    }

    res.status(201).json({ msg: "Successfully added materi", data: { id: newMateriId } });
  } catch (error) {
    handleCustomErrorRoute(res,error);
  }
};

const UpdateMateriAdmin = async(req,res)=>{
  try {
    
    const data = req.body
    const {id} = req.params
  
    const UpdateMateriData = await UpdateMateriToDB(data,id)

    if (!UpdateMateriData) {
      throw new CustomError(500, "Failed to Update materi to database");
    }

    res.status(200).json({ msg: "Successfully Update materi"});
    
  } catch (error) {
    handleCustomErrorRoute(res,error);
    
  }
}



//USER
const getKategoriMateri = async (req, res) => {
  try {
    const userId = req.user.id;
    const kategoriMateri = await getAllKategoriMateri();
    res.status(200).json({ msg: "Successfully retrieved kategori materi", data: kategoriMateri });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const GetAllMateri = async (req, res) => {
  try {
    const { kategori } = req.query;
    const userId = req.user.id;
    console.log(userId)
    let GetAllMateriData = await GetAllMateriToDB(kategori,userId);

    //Set Access For User
    GetAllMateriData = GetAllMateriData.map(item => ({
      ...item,
      sudah_mengambil: item.sudah_mengambil !== null
    }));

    if (!GetAllMateriData || GetAllMateriData.length === 0) {
      throw new CustomError(404, "No materials found");
    }

    res.status(200).json({ msg: "Successfully retrieved materi", data: GetAllMateriData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const GetSpesificMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const GetSpeseificMateriData = await GetSpesificMateriToDB(id);
    if (!GetSpeseificMateriData || GetSpeseificMateriData.length === 0) {
      throw new CustomError(404, "No materials found");
    }
    res.status(200).json({ msg: "Successfully retrieved materi", data: GetSpeseificMateriData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

const AddNewMateriAccessUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const AddNewMateriAccessUserData = await AddNewMateriAccessToDB(userId, id);
    if (!AddNewMateriAccessUserData || AddNewMateriAccessUserData.length === 0) {
      throw new CustomError(500, "Failed To Add New User Access");
    }
    res.status(200).json({ msg: "Successfully Add User Access", data: AddNewMateriAccessUserData });
  } catch (error) {
    handleCustomErrorRoute(res, error);
  }
};

module.exports = { AddMateriAdmin, getKategoriMateri, GetAllMateri, GetSpesificMateri, AddNewMateriAccessUser,UpdateMateriAdmin };
