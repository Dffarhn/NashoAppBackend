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
// SELECT soal.*, pilihansoal.*, jawabansoal.*
// FROM materi
// JOIN kumpulansoal ON kumpulansoal.id_materi = materi.id
// JOIN soal ON kumpulansoal.id = soal.id_kumpulan_soal
// JOIN pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
// JOIN jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
// WHERE kumpulansoal.id_materi = $1
module.exports = {GetAllQuizMateriToDB}
