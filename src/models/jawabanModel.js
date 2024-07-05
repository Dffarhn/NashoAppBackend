const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");

async function CekJawabanUserToDB(data) {
  try {
    let jawaban = false;

    const { id_soal, id_jawaban, id_mengambil_materi } = data;

    const queryValues = [id_soal];

    const queryText = `
        SELECT 
            soal.jawaban_benar
        FROM 
        soal

        WHERE soal.id = $1

        `;

    const JawabanBenar = await pool.query(queryText, queryValues);

    if (id_jawaban == JawabanBenar.rows[0].jawaban_benar) {
      jawaban = true;

      return jawaban;
    }

    return jawaban;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { CekJawabanUserToDB };
