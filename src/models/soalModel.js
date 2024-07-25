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
    throw new CustomError(404, "Id Materi Not Found", "Wrong id_materi");
  }
}

async function AddSoalQuizToMateriToDB(data) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    await client.query("BEGIN"); // Start a transaction

    const { soal, jawaban_benar, pilihan, id_materi,pembahasan } = data;

    console.log(data);

    const kumpulan_soal = await checkOrInsertKumpulanSoalQuiz(client, id_materi);

    const queryTextJawaban = `
      INSERT INTO jawabansoal (jawaban)
      VALUES ${pilihan.map((_, index) => `($${index + 1})`).join(", ")}
      RETURNING id;
    `;

    const resultJawaban = await client.query(queryTextJawaban, pilihan);

    const jawabanBenarToDB = resultJawaban.rows[jawaban_benar].id;

    const queryValueSoal = [soal, jawabanBenarToDB, kumpulan_soal,pembahasan];
    const queryTextSoal = `
      INSERT INTO soal (soal, jawaban_benar, id_kumpulan_soal, pembahasan)
      VALUES ($1, $2, $3, $4)
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
      console.log(kategori_materi);
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

    const { soal, jawaban_benar, pilihan, kategori_materi, phase,pembahasan } = data;

    const kumpulan_soal = await checkOrInsertKumpulanSoalUjian(client, kategori_materi, phase);

    const queryTextJawaban = `
      INSERT INTO jawabansoal (jawaban)
      VALUES ${pilihan.map((_, index) => `($${index + 1})`).join(", ")}
      RETURNING id;
    `;

    const resultJawaban = await client.query(queryTextJawaban, pilihan);

    const jawabanBenarToDB = resultJawaban.rows[jawaban_benar].id;

    const queryValueSoal = [soal, jawabanBenarToDB, kumpulan_soal,pembahasan];
    const queryTextSoal = `
      INSERT INTO soal (soal, jawaban_benar, id_kumpulan_soal,pembahasan)
      VALUES ($1, $2, $3,$4)
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

///{
//   "id_soal": "2c809db1-d071-47c9-b636-af6e47718ff5",
//   "soal": "apakah ini berhasil122312 ujian lagi 2",
//   "pilihan": [
//       {
//           "id": "a1a527a0-c400-40d0-a5db-bab798d2aab3",
//           "jawaban": "iya"
//       },
//       {
//           "id": "fdcdd1aa-39dd-4483-ab83-6a07722c0d3f",
//           "jawaban": "no"
//       }
//   ],
//   "jawaban_benar": "fdcdd1aa-39dd-4483-ab83-6a07722c0d3f"
//}
//
async function UpdateSoalToDB(data) {
  const client = await pool.connect();
  try {
    const { id_soal, soal, pilihan, jawaban_benar,pembahasan } = data;
    await client.query("BEGIN");

    await UpdatePilihanJawaban(pilihan, client);

    const queryTextUpdateSoal = `
      UPDATE public.soal
      SET soal=$2, jawaban_benar=$3, pembahasan=$4
      WHERE id=$1
    `;
    const queryValuesUpdateSoal = [id_soal, soal, jawaban_benar,pembahasan];
    await client.query(queryTextUpdateSoal, queryValuesUpdateSoal);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    // Ensure proper error handling
    handleCustomErrorModel(error);
  } finally {
    client.release();
  }
}

async function UpdatePilihanJawaban(data, client) {
  const queries = data.map(async (item) => {
    try {
      const QueryTextUpdateJawaban = `
        UPDATE public.jawabansoal
        SET jawaban=$2
        WHERE id=$1
      `;
      const QueryValuesUpdateJawaban = [item.id, item.jawaban];
      await client.query(QueryTextUpdateJawaban, QueryValuesUpdateJawaban);
    } catch (error) {
      // console.error(`Error updating jawaban with id ${item.id}:`, error);
      throw new CustomError(500, "Failed Update Pilihan Jawaban"); // Lempar ulang untuk memastikan kesalahan dipropagasi
    }
  });

  await Promise.all(queries);
}

async function DeletePilihanJawaban(id, client) {
  try {
    const queryText = `
      SELECT jawabansoal.id AS id
      FROM soal 
      JOIN pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
      JOIN jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
      WHERE soal.id = $1
    `;
    const queryValues = [id];
    const { rows: KumpulanIdJawaban } = await client.query(queryText, queryValues);

    if (KumpulanIdJawaban.length > 0) {
      const queries = KumpulanIdJawaban.map(async (item) => {
        const QueryTextDeleteJawaban = `
          DELETE FROM public.jawabansoal
          WHERE id = $1
        `;
        const QueryValuesDeleteJawaban = [item.id];
        await client.query(QueryTextDeleteJawaban, QueryValuesDeleteJawaban);
      });

      await Promise.all(queries);
    }
  } catch (error) {
    throw new CustomError(500, "Failed to delete pilihan jawaban");
  }
}

async function DeleteSoalToDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await DeletePilihanJawaban(id, client);

    const queryTextDeleteSoal = `
      DELETE FROM public.soal
      WHERE id = $1
    `;
    const queryValuesDeleteSoal = [id];
    await client.query(queryTextDeleteSoal, queryValuesDeleteSoal);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    handleCustomErrorModel(error);
  } finally {
    client.release();
  }
}

module.exports = { AddSoalQuizToMateriToDB, AddSoalUjianToMateriToDB, UpdateSoalToDB, DeleteSoalToDB };
