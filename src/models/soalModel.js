const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function AddSoalToMateriToDB(data, tipe) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    await client.query('BEGIN'); // Start a transaction

    const { soal, jawaban_benar, pilihan, id_materi } = data;
    let kumpulan_soal = null;
    let kategori_soal;

    if (tipe === "ujian") {
      kategori_soal = "dc2e83a4-418d-48a6-b50f-0a487db6252a";
    } else {
      kategori_soal = "99b24286-5636-47bf-ab47-400159452265";
    }

    const queryValuesKS = [id_materi, kategori_soal];
    const queryTextKS = `
      INSERT INTO kumpulansoal(id_materi, kategori_soal)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const { rows: rowsKS } = await client.query(queryTextKS, queryValuesKS);
    kumpulan_soal = rowsKS[0].id;

    const queryTextJawaban = `
      INSERT INTO jawabansoal (jawaban)
      VALUES ${pilihan.map((_, index) => `($${index + 1})`).join(", ")}
      RETURNING id;
    `;

    console.log(queryTextJawaban)
    const resultJawaban = await client.query(queryTextJawaban, pilihan);

    // console.log(resultJawaban)

    const jawabanBenarToDB = resultJawaban.rows[jawaban_benar].id;

    const queryValueSoal = [soal, jawabanBenarToDB, kumpulan_soal];
    const queryTextSoal = `
      INSERT INTO soal (soal, jawaban_benar, id_kumpulan_soal)
      VALUES ($1, $2, $3)
      RETURNING pilihan_jawaban;
    `;
    const resultsoal = await client.query(queryTextSoal, queryValueSoal);

    const id_soal = resultsoal.rows[0].pilihan_jawaban;
    console.log(id_soal)

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


//SELECT soal.*, pilihansoal.*, jawabansoal.*
// FROM materi
// JOIN kumpulansoal ON kumpulansoal.id_materi = materi.id
// JOIN soal ON kumpulansoal.id = soal.id_kumpulan_soal
// JOIN pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
// JOIN jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id