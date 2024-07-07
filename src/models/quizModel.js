const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function GetAllQuizMateriToDB(id_materi) {
  try {
    const queryValues = [id_materi];

    const queryText = `
        SELECT 
            soal.id AS soal_id,
            soal.soal,
            json_agg(
                json_build_object(
                    'id', jawabansoal.id, 
                    'jawaban', jawabansoal.jawaban
                )
            ) AS pilihan
        FROM 
            materi
        JOIN 
            kumpulansoal ON kumpulansoal.id_materi = materi.id
        JOIN 
            soal ON kumpulansoal.id = soal.id_kumpulan_soal
        JOIN 
            pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
        JOIN 
            jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
        WHERE 
            kumpulansoal.id_materi = $1
        GROUP BY 
            soal.id, soal.soal;

        `;

    const { rows } = await pool.query(queryText, queryValues);

    if (!rows) {
      throw new CustomError(500, "Failed To Call Database");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function AddTakeQuizUserToDB(data) {
  try {
    const { id_materi, id_user } = data;

    const queryTextKS = `
            SELECT id from kumpulansoal WHERE id_materi = $1;
        `;
    const queryValuesKS = [id_materi];

    const KumpulanSoalDB = await pool.query(queryTextKS, queryValuesKS);

    const queryText = `
        INSERT INTO public.mengambilquiz(
            usernasho, quiz)
            VALUES ($1, $2)
            RETURNING id;
        `;

    const queryValues = [id_user, KumpulanSoalDB.rows[0].id]; // Correct order of parameters

    const { rows } = await pool.query(queryText, queryValues);
    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetNilaiQuizToDB(data) {
  try {
    const { id_mengambil_quiz, id_user } = data;

    console.log(id_mengambil_quiz, id_user);

    const queryText = `
        SELECT  
            jawabanquizuser.status_jawaban
        FROM 
            mengambilquiz
        JOIN 
            jawabanquizuser ON jawabanquizuser.quiz_diambil = mengambilquiz.id
        WHERE
            mengambilquiz.usernasho = $1
            AND jawabanquizuser.quiz_diambil = $2;


        `;

    const queryValues = [id_user, id_mengambil_quiz];

    const { rows } = await pool.query(queryText, queryValues);

    // Count the number of true answers
    const trueCount = rows.filter((item) => item.status_jawaban === true).length;

    // Calculate the points
    const totalQuestions = rows.length;
    const maxPoints = 100;
    const points = (trueCount / totalQuestions) * maxPoints;

    return Math.ceil(points);
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { GetAllQuizMateriToDB, AddTakeQuizUserToDB, GetNilaiQuizToDB };