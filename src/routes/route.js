const { Router } = require("express");
const { registerValidation, loginValidation, AddMateriValidation, AddAccessMateriUserValidation, UpdateMateriValidation, DeleteMateriValidation, GetAllMateriValidation, GetAllQUizMateriValidation, PostAnswerQuizMateriValidation, GetNilaiQuizMateriValidation, UserTakeQuizValidation, AdminAddQuizValidation, UserTakeUjianValidation, PostAnswerUjianMateriValidation, GetNilaiUjianValidation, AdminAddUjianValidation, PembahasanQuizValidation, PembahasanUjianValidation, UpdateUserValidation, UpdatePasswordValidation, SoalUpdateValidation, DeleteSoalValidation } = require("../function/validators");
const { handleValidationErrors } = require("../middleware/validatormid");
const { RegisterUser, LoginUser, Refresh_Access_Token, GetProfileUser, UpdateProfileUser, UpdatePasswordUser } = require("./userRoute");
const { AddMateriAdmin, getKategoriMateri, GetAllMateri, GetSpesificMateri, AddNewMateriAccessUser, UpdateMateriAdmin, DeleteMateriAdmin } = require("./MateriRoute");
const { Auth_Access, Auth_Access_Admin } = require("../middleware/VerifyToken");
const { AddSoalQuiz, AddSoalUjian, UpdateSoalRoute, DeleteSoalRoute } = require("./SoalRoute");
const { GetAllQuizMateri, AddQuizUserTake, GetNilaiQuiz, GetAllQuizMateriAdmin } = require("./quizRoute");
const { CekJawabanUser, CekJawabanUserUjian } = require("./JawabanRoute");

const { GetPembahasanUjian, GetPembahasanQuiz } = require("./PembahasanRoute");
const { GetStatistikUserRoute, GetStatistikHomeUserRoute } = require("./StatistikRoute");
const { AddUjianUserTake, GetUjianByPhase, GetNilaiUjian, GetUjianByPhaseAdmin } = require("./UjianROute");
const route = Router();

route.get("/", (req, res) => {
  res.json("halo world");
});
//User dan Admin
route.post("/register", registerValidation(), handleValidationErrors, RegisterUser);
route.post("/login", loginValidation(), handleValidationErrors, LoginUser);
route.get("/token", Refresh_Access_Token);

//KERJAIN WALAU TAK PENTING DAP

route.get("/profile",Auth_Access,GetProfileUser)
route.patch("/profile",UpdateUserValidation(),handleValidationErrors,Auth_Access,UpdateProfileUser)
route.patch("/profile/newpassword",UpdatePasswordValidation(),handleValidationErrors,Auth_Access,UpdatePasswordUser)

//Materi Admin
route.post("/admin/materi", AddMateriValidation(), handleValidationErrors, Auth_Access_Admin, AddMateriAdmin);
route.patch("/admin/materi/:id", UpdateMateriValidation(), handleValidationErrors, Auth_Access_Admin, UpdateMateriAdmin);
route.delete("/admin/delete/:id", DeleteMateriValidation(), handleValidationErrors, Auth_Access_Admin, DeleteMateriAdmin);

//Materi User
route.get("/kategoriMateri", Auth_Access, getKategoriMateri);// get kategori nasho atau sharaf
route.get("/materis", GetAllMateriValidation(), handleValidationErrors, Auth_Access, GetAllMateri);
route.get("/materi/:id", Auth_Access, GetSpesificMateri); // Add Validation
//User Access The Materi
route.post("/selectMateri/:id_materi", AddAccessMateriUserValidation(), handleValidationErrors, Auth_Access, AddNewMateriAccessUser);

//Admin Update Soal And Jawaban baik quiz maupun ujian
route.patch("/admin/soal/:id_soal", SoalUpdateValidation(), handleValidationErrors, Auth_Access_Admin,UpdateSoalRoute)
route.delete("/admin/soal/:id_soal",DeleteSoalValidation(), handleValidationErrors,Auth_Access_Admin,DeleteSoalRoute)

//Quiz Admin
route.post("/admin/quiz/soal/:id_materi", AdminAddQuizValidation(),handleValidationErrors,Auth_Access_Admin,AddSoalQuiz);
route.get("/admin/quiz/:id_materi",GetAllQUizMateriValidation(),handleValidationErrors,Auth_Access_Admin,GetAllQuizMateriAdmin)

//Quiz User
route.get("/quiz/:id_materi",GetAllQUizMateriValidation(),handleValidationErrors,Auth_Access,GetAllQuizMateri)
route.post("/quiz/:id_materi",UserTakeQuizValidation(),handleValidationErrors,Auth_Access,AddQuizUserTake)
route.post("/quiz/cek/:id_mengambil_quiz",PostAnswerQuizMateriValidation(),handleValidationErrors,Auth_Access, CekJawabanUser)
route.get("/quiz/nilai/:id_mengambil_quiz",GetNilaiQuizMateriValidation(),handleValidationErrors,Auth_Access,GetNilaiQuiz)

//Ujian Admin
route.post("/admin/ujian/soal", AdminAddUjianValidation(),handleValidationErrors, Auth_Access_Admin,AddSoalUjian);
route.get("/admin/ujian/:id",Auth_Access_Admin,GetUjianByPhaseAdmin) //AddValidation

//Ujian User
route.get("/ujian/:id",Auth_Access,GetUjianByPhase) //AddValidation
route.post("/ujian/:id",UserTakeUjianValidation(),handleValidationErrors,Auth_Access,AddUjianUserTake)
route.post("/ujian/cek/:id_mengambil_ujian",PostAnswerUjianMateriValidation(),handleValidationErrors,Auth_Access, CekJawabanUserUjian)
route.get("/ujian/nilai/:id_mengambil_ujian",GetNilaiUjianValidation(),handleValidationErrors,Auth_Access,GetNilaiUjian)


//Pembahasan Quiz dan Ujian

route.get("/ujian/pembahasan/:id_mengambil_ujian", PembahasanUjianValidation(), handleValidationErrors, Auth_Access,GetPembahasanUjian)
route.get("/quiz/pembahasan/:id_mengambil_quiz", PembahasanQuizValidation(), handleValidationErrors,Auth_Access,GetPembahasanQuiz)


//Statistik cuman ada 0% 33% 66%
// 33% hanya akses materi
// 66% mengerjakan quiz tidak lolos
// 0% quiz selanjutnya

//User Statistik
route.get("/statistik",Auth_Access,GetStatistikUserRoute)


route.get("/statistik/home",Auth_Access,GetStatistikHomeUserRoute)




module.exports = { route };
