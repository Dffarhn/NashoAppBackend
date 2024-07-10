const { Router } = require("express");
const { registerValidation, loginValidation, AddMateriValidation, AddAccessMateriUserValidation, UpdateMateriValidation, DeleteMateriValidation, GetAllMateriValidation, GetAllQUizMateriValidation, PostAnswerQuizMateriValidation, GetNilaiQuizMateriValidation, UserTakeQuizValidation, AdminAddQuizValidation, UserTakeUjianValidation, PostAnswerUjianMateriValidation, GetNilaiUjianValidation } = require("../function/validators");
const { handleValidationErrors } = require("../middleware/validatormid");
const { RegisterUser, LoginUser, Refresh_Access_Token } = require("./userRoute");
const { AddMateriAdmin, getKategoriMateri, GetAllMateri, GetSpesificMateri, AddNewMateriAccessUser, UpdateMateriAdmin, DeleteMateriAdmin } = require("./MateriRoute");
const { Auth_Access, Auth_Access_Admin } = require("../middleware/VerifyToken");
const { AddSoalQuiz, AddSoalUjian } = require("./SoalRoute");
const { GetAllQuizMateri, AddQuizUserTake, GetNilaiQuiz } = require("./quizRoute");
const { CekJawabanUser, CekJawabanUserUjian } = require("./JawabanRoute");
const { GetUjianByPhase, AddUjianUserTake, GetNilaiUjian } = require("./UjianROute");
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

//Materi User
route.get("/kategoriMateri", Auth_Access, getKategoriMateri);


route.get("/materis", GetAllMateriValidation(), handleValidationErrors, Auth_Access, GetAllMateri);
route.get("/materi/:id", Auth_Access, GetSpesificMateri);

//Materi Add Soal And Jawaban

//Quiz Admin
route.post("/admin/quiz/soal/:id_materi", AdminAddQuizValidation(),handleValidationErrors,Auth_Access_Admin,AddSoalQuiz);

//Quiz User
route.get("/quiz/:id_materi",GetAllQUizMateriValidation(),handleValidationErrors,Auth_Access,GetAllQuizMateri)
route.post("/quiz/:id_materi",UserTakeQuizValidation(),handleValidationErrors,Auth_Access,AddQuizUserTake)
route.post("/quiz/cek/:id_mengambil_quiz",PostAnswerQuizMateriValidation(),handleValidationErrors,Auth_Access, CekJawabanUser)
route.get("/quiz/nilai/:id_mengambil_quiz",GetNilaiQuizMateriValidation(),handleValidationErrors,Auth_Access,GetNilaiQuiz)

//Ujian
route.post("/admin/ujian/soal", AdminAddQuizValidation(),handleValidationErrors, Auth_Access_Admin,AddSoalUjian);

route.get("/ujian/:id",Auth_Access,GetUjianByPhase)
route.post("/ujian/:id",UserTakeUjianValidation(),handleValidationErrors,Auth_Access,AddUjianUserTake)
route.post("/ujian/cek/:id_mengambil_ujian",PostAnswerUjianMateriValidation(),handleValidationErrors,Auth_Access, CekJawabanUserUjian)
route.get("/ujian/nilai/:id_mengambil_ujian",GetNilaiUjianValidation(),handleValidationErrors,Auth_Access,GetNilaiUjian)





//User Access The Materi
route.post("/selectMateri/:id_materi", AddAccessMateriUserValidation(), handleValidationErrors, Auth_Access, AddNewMateriAccessUser);

module.exports = { route };
