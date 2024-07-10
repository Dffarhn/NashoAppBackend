const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function checkOrInsertKumpulanSoalQuiz(client, id_materi) {
  try {
    // Check if a kumpulansoal with the given id_materi an already exists
    const checkQueryText = `
      SELECT id FROM kumpulansoalquiz WHERE id_materi = $1
    `;
    const checkQueryValues = [id_materi];
    const { rows: existingKS } = await client.query(checkQueryText, checkQueryValues);

    if (existingKS.length > 0) {
      return existingKS[0].id;
    } else {
      const insertQueryText = `
        INSERT INTO kumpulansoalquiz(id_materi)
        VALUES ($1)
        RETURNING id;
      `;
      const insertQueryValues = [id_materi];
      const { rows: newKS } = await client.query(insertQueryText, insertQueryValues);
      return newKS[0].id;
    }
  } catch (error) {
    throw new CustomError(500, "Error checking or inserting kumpulansoal");
  }
}

async function AddSoalQuizToMateriToDB(data) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    await client.query("BEGIN"); // Start a transaction

    const { soal, jawaban_benar, pilihan, id_materi } = data;

    console.log(data);

    const kumpulan_soal = await checkOrInsertKumpulanSoalQuiz(client, id_materi);

    const queryTextJawaban = `
      INSERT INTO jawabansoal (jawaban)
      VALUES ${pilihan.map((_, index) => `($${index + 1})`).join(", ")}
      RETURNING id;
    `;

    const resultJawaban = await client.query(queryTextJawaban, pilihan);

    const jawabanBenarToDB = resultJawaban.rows[jawaban_benar].id;

    const queryValueSoal = [soal, jawabanBenarToDB, kumpulan_soal];
    const queryTextSoal = `
      INSERT INTO soal (soal, jawaban_benar, id_kumpulan_soal)
      VALUES ($1, $2, $3)
      RETURNING pilihan_jawaban;
    `;
    const resultSoal = await client.query(queryTextSoal, queryValueSoal);

    const id_soal = resultSoal.rows[0].pilihan_jawaban;

    const queryValuePilihan = resultJawaban.rows.map((item) => [id_soal, item.id]);
    const flatQueryValuesPilihan = queryValuePilihan.flat();
    const queryTextPilihan = `
      INSERT INTO pilihansoal (id_soal, id_jawaban)
      VALUES ${queryValuePilihan.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(", ")}
      RETURNING id_jawaban;
    `;
    const resultPilihan = await client.query(queryTextPilihan, flatQueryValuesPilihan);

    if (!resultPilihan) {
      throw new CustomError(500, "Failed To Add Soal to Database");
    }

    await client.query("COMMIT"); // Commit the transaction
    return kumpulan_soal;
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction on error
    handleCustomErrorModel(error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

async function checkOrInsertKumpulanSoalUjian(client, kategori_materi, phase) {
  try {
    // Check if a kumpulansoal with the given kategori_materi,phase an already exists
    const checkQueryText = `
      SELECT id FROM kumpulansoalujian WHERE kategori_materi=$1 AND phase = $2;
    `;
    const checkQueryValues = [kategori_materi, phase];
    const { rows: existingKS } = await client.query(checkQueryText, checkQueryValues);

    if (existingKS.length > 0) {
      return existingKS[0].id;
    } else {

      console.log(kategori_materi)
      const insertQueryText = `
        INSERT INTO kumpulansoalujian (kategori_materi, phase)
        VALUES ($1,$2)
        RETURNING id;
      `;

      const insertQueryValues = [kategori_materi, phase];
      const { rows: newKS } = await client.query(insertQueryText, insertQueryValues);
      return newKS[0].id;
    }
  } catch (error) {
    throw new CustomError(500, "Error checking or inserting kumpulansoal");
  }
}

async function AddSoalUjianToMateriToDB(data) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    await client.query("BEGIN"); // Start a transaction

    const { soal, jawaban_benar, pilihan, kategori_materi, phase } = data;


    const kumpulan_soal = await checkOrInsertKumpulanSoalUjian(client, kategori_materi, phase);

    const queryTextJawaban = `
      INSERT INTO jawabansoal (jawaban)
      VALUES ${pilihan.map((_, index) => `($${index + 1})`).join(", ")}
      RETURNING id;
    `;

    const resultJawaban = await client.query(queryTextJawaban, pilihan);

    const jawabanBenarToDB = resultJawaban.rows[jawaban_benar].id;

    const queryValueSoal = [soal, jawabanBenarToDB, kumpulan_soal];
    const queryTextSoal = `
      INSERT INTO soal (soal, jawaban_benar, id_kumpulan_soal)
      VALUES ($1, $2, $3)
      RETURNING pilihan_jawaban;
    `;
    const resultSoal = await client.query(queryTextSoal, queryValueSoal);

    const id_soal = resultSoal.rows[0].pilihan_jawaban;

    const queryValuePilihan = resultJawaban.rows.map((item) => [id_soal, item.id]);
    const flatQueryValuesPilihan = queryValuePilihan.flat();
    const queryTextPilihan = `
      INSERT INTO pilihansoal (id_soal, id_jawaban)
      VALUES ${queryValuePilihan.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(", ")}
      RETURNING id_jawaban;
    `;
    const resultPilihan = await client.query(queryTextPilihan, flatQueryValuesPilihan);

    if (!resultPilihan) {
      throw new CustomError(500, "Failed To Add Soal to Database");
    }

    await client.query("COMMIT"); // Commit the transaction
    return kumpulan_soal;
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction on error
    handleCustomErrorModel(error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

module.exports = { AddSoalQuizToMateriToDB,AddSoalUjianToMateriToDB };
