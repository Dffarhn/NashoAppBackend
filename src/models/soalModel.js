const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function checkOrInsertKumpulanSoal(client, id_materi, kategori_soal) {
  try {
    // Check if a kumpulansoal with the given id_materi and kategori_soal already exists
    const checkQueryText = `
      SELECT id FROM kumpulansoal WHERE id_materi = $1 AND kategori_soal = $2;
    `;
    const checkQueryValues = [id_materi, kategori_soal];
    const { rows: existingKS } = await client.query(checkQueryText, checkQueryValues);

    if (existingKS.length > 0) {
      return existingKS[0].id;
    } else {
      const insertQueryText = `
        INSERT INTO kumpulansoal(id_materi, kategori_soal)
        VALUES ($1, $2)
        RETURNING id;
      `;
      const insertQueryValues = [id_materi, kategori_soal];
      const { rows: newKS } = await client.query(insertQueryText, insertQueryValues);
      return newKS[0].id;
    }
  } catch (error) {
    throw new CustomError(500, 'Error checking or inserting kumpulansoal');
  }
}

async function AddSoalToMateriToDB(data, tipe) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    await client.query('BEGIN'); // Start a transaction

    const { soal, jawaban_benar, pilihan, id_materi } = data;
    let kategori_soal;

    if (tipe === "ujian") {
      kategori_soal = "dc2e83a4-418d-48a6-b50f-0a487db6252a";
    } else {
      kategori_soal = "99b24286-5636-47bf-ab47-400159452265";
    }

    const kumpulan_soal = await checkOrInsertKumpulanSoal(client, id_materi, kategori_soal);

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

    const queryValuePilihan = resultJawaban.rows.map(item => [id_soal, item.id]);
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

    await client.query('COMMIT'); // Commit the transaction
    return kumpulan_soal;
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction on error
    handleCustomErrorModel(error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

module.exports = { AddSoalToMateriToDB };
