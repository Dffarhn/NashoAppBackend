const { Router } = require("express");
const cors = require("cors");
const { registerValidation, loginValidation, AddMateriValidation, AddAccessMateriUserValidation, UpdateMateriValidation, DeleteMateriValidation, GetAllMateriValidation } = require("../function/validators");
const { handleValidationErrors } = require("../middleware/validatormid");
const { RegisterUser, LoginUser, Refresh_Access_Token } = require("./userRoute");
const { AddMateriAdmin, getKategoriMateri, GetAllMateri, GetSpesificMateri, AddNewMateriAccessUser, UpdateMateriAdmin, DeleteMateriAdmin } = require("./MateriRoute");
const { Auth_Access, Auth_Access_Admin } = require("../middleware/VerifyToken");
const route = Router();

route.get("/", (req, res) => {
  res.json("halo world");
});
//User dan Admin
route.post("/register", registerValidation(), handleValidationErrors, RegisterUser);
route.post("/login", loginValidation(), handleValidationErrors, LoginUser);
route.get("/token", Refresh_Access_Token);

//Materi Admin
route.post("/admin/materi", AddMateriValidation(), handleValidationErrors, Auth_Access_Admin, AddMateriAdmin);
route.patch("/admin/materi/:id", UpdateMateriValidation(), handleValidationErrors, Auth_Access_Admin, UpdateMateriAdmin); //BELUM SELESAI NI UPDATE MUMET
route.delete("/admin/delete/:id", DeleteMateriValidation(), handleValidationErrors, Auth_Access_Admin, DeleteMateriAdmin);

//Materi Add Soal And Jawaban

//Quiz
route.post("/admin/quiz/soal/:id_materi", Auth_Access_Admin);

//Ujian
route.post("/admin/ujian/soal/:id_materi", Auth_Access_Admin);

//Materi User
route.get("/kategoriMateri", Auth_Access, getKategoriMateri);
route.get("/materis", GetAllMateriValidation(), handleValidationErrors, Auth_Access, GetAllMateri);
route.get("/materi/:id", Auth_Access, GetSpesificMateri);

route.post("/selectMateri/:id", AddAccessMateriUserValidation(), handleValidationErrors, Auth_Access, AddNewMateriAccessUser);

module.exports = { route };
