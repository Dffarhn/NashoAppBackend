const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function CekJawabanUserToDB(data) {
  const client = await pool.connect();
  try {
    let jawaban = false;

    const { id_soal, id_jawaban, id_mengambil_quiz } = data;

    const queryText = `
      SELECT 
        soal.jawaban_benar
      FROM 
        soal
      WHERE 
        soal.id = $1
    `;

    const { rows: JawabanBenarRows } = await client.query(queryText, [id_soal]);

    if (JawabanBenarRows.length === 0) {
      throw new CustomError(404, "Soal not found");
    }

    if (id_jawaban == JawabanBenarRows[0].jawaban_benar) {
      jawaban = true;
    }

    await client.query("BEGIN");

    const queryTextSave = `
      INSERT INTO public.jawabanquizuser(
        quiz_diambil, soal_quiz, jawaban_user, status_jawaban)
      VALUES ($1, $2, $3, $4)
    `;
    const queryValuesSave = [id_mengambil_quiz, id_soal, id_jawaban, jawaban];

    await client.query(queryTextSave, queryValuesSave);

    await client.query("COMMIT");

    return jawaban;
  } catch (error) {
    await client.query("ROLLBACK");
    handleCustomErrorModel(error);
    throw error; // Ensure the error is thrown so the caller is aware of the failure
  } finally {
    client.release();
  }
}

module.exports = { CekJawabanUserToDB };
