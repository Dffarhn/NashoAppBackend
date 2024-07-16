const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

//ADMIN
async function addMateriToDB(data) {
  try {
    const { judul, isi, linkVideo, kategori, phase, tingkat } = data;
    const tanggalDibuat = new Date();

    const queryText = `
            INSERT INTO public.materi(
                phase, judul, isi, linkvideo, kategori, created_at,tingkat
            )
            VALUES ($1, $2, $3, $4, $5, $6,$7)
            RETURNING id;
        `;
    const queryValues = [phase, judul, isi, linkVideo, kategori, tanggalDibuat, tingkat];

    const result = await pool.query(queryText, queryValues);

    if (!result.rows[0]) {
      throw new CustomError(500, "Failed to add materi to database");
    }

    return result.rows[0].id;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function UpdateMateriToDB(data, id) {
  try {
    const { judul, isi, linkVideo} = data;
    
    const queryText = `

      UPDATE public.materi
      SET judul=$2, isi=$3, linkvideo=$4
      WHERE id = $1;
    
    `

    const queryValues = [id,judul,isi,linkVideo];

    const UpdateMateriDB = await pool.query(queryText,queryValues)
    return UpdateMateriDB
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function DeleteMateriToDB(id) {
  try {
    const queryValues = [id];
    const queryText = `
    DELETE FROM public.materi
    WHERE id = $1;
    `;

    const result = await pool.query(queryText, queryValues);

    // Optionally log the result or return a value
    // console.log(`Deleted rows: ${result.rowCount}`);
    return result.rowCount; // Return the number of deleted rows
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

//USER
async function getAllKategoriMateri() {
  try {
    const queryText = `SELECT * FROM kategorimateri`;
    const result = await pool.query(queryText);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No kategori materi found in the database");
    }

    return result.rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}
async function GetAllMateriToDB(kategori, UserId) {
  try {
    let queryValues = [UserId, kategori];

    const queryText = `
    SELECT 
        phase.id AS phase,
        json_agg(
            json_build_object(
                'id', ordered_materi.id,
                'judul', ordered_materi.judul,
                'sudah_mengambil', ordered_materi.sudah_mengambil,
                'tingkat', ordered_materi.tingkat,
                'quiz', (
                    SELECT json_agg(
                        json_build_object(
                            'nilai', subqueryquiz.nilai,
                            'lulus', subqueryquiz.status
                        )
                    )
                    FROM(
                      SELECT *
                      FROM mengambilquiz
                      JOIN kumpulansoalquiz ON mengambilquiz.quiz = kumpulansoalquiz.id
                      WHERE kumpulansoalquiz.id_materi = ordered_materi.id
                      ORDER BY mengambilquiz.created_at DESC
                      LIMIT 1
                    ) AS subqueryquiz
                )
            )
        ) AS Materi,
        (
            SELECT json_agg(
                json_build_object(
                    'id', ujian_phase.id,
                    'riwayat', (
                        SELECT json_agg(
                            json_build_object(
                                'nilai', subqueryujian.nilai,
                                'lulus', subqueryujian.status
                            )
                        )
                        FROM (
                            SELECT mengambilujian.nilai, mengambilujian.status
                            FROM mengambilujian
                            WHERE mengambilujian.ujian = ujian_phase.id AND mengambilujian.usernasho = $1
                            ORDER BY mengambilujian.created_at DESC
                            LIMIT 1
                        ) AS subqueryujian
                        
                    )
                )
            )
            FROM kumpulansoalujian AS ujian_phase
            WHERE ujian_phase.phase = phase.id AND ujian_phase.kategori_materi = $2
        ) AS ujian

    FROM 
        phase
    LEFT JOIN (
        SELECT
            materi.id,
            materi.judul,
            materi.tingkat,
            materi.phase,
            mengambil_materi.id AS sudah_mengambil
        FROM 
            materi
        LEFT JOIN 
            mengambil_materi ON materi.id = mengambil_materi.materi AND mengambil_materi.usernasho = $1
        WHERE
            materi.kategori = $2
        ORDER BY
            materi.tingkat ASC
    ) AS ordered_materi ON ordered_materi.phase = phase.id
    GROUP BY
        phase.id
    ORDER BY
        phase.id ASC;
    `;
    
    const { rows } = await pool.query(queryText, queryValues);

    if (!rows) {
      throw new CustomError(404, "No materials found");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetSpesificMateriToDB(id) {
  try {
    const queryText = `
    SELECT materi.*, kumpulansoalquiz.id_materi AS id_quiz
    FROM materi
    JOIN kumpulansoalquiz ON materi.id = kumpulansoalquiz.id_materi 
    
    
    WHERE materi.id = $1`;
    const queryValues = [id];

    const { rows } = await pool.query(queryText, queryValues);
    if (!rows) {
      throw new CustomError(404, "No materials found");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function AddNewMateriAccessToDB(userId, id) {
  try {
    const queryText = `INSERT INTO public.mengambil_materi(
        usernasho, materi)
        VALUES ($1, $2)
        RETURNING id;
        ;`;

    const queryValues = [userId, id];

    const { rows } = await pool.query(queryText, queryValues);
    if (!rows) {
      throw new CustomError(500, "Failed To Add Access To DB");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { addMateriToDB, getAllKategoriMateri, GetAllMateriToDB, GetSpesificMateriToDB, AddNewMateriAccessToDB, UpdateMateriToDB, DeleteMateriToDB };
