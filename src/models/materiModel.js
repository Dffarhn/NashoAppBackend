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
      throw new CustomError(500, "Gagal Menambahkan Materi Ke Database");
    }

    return result.rows[0].id;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function UpdateMateriToDB(data, id) {
  try {
    const { judul, isi, linkVideo } = data;

    const queryText = `

      UPDATE public.materi
      SET judul=$2, isi=$3, linkvideo=$4
      WHERE id = $1;
    
    `;

    const queryValues = [id, judul, isi, linkVideo];

    const UpdateMateriDB = await pool.query(queryText, queryValues);
    return UpdateMateriDB;
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
      throw new CustomError(404, "Tidak Ada Kategori Materi yang Ditemukan");
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
                'phase', ordered_materi.phase,
                'tingkat', ordered_materi.tingkat,
                'quiz', (
                    SELECT json_agg(
                        json_build_object(
                            'nilai', subqueryquiz.nilai,
                            'lulus', subqueryquiz.status
                        )
                    )
                    FROM (
                      SELECT DISTINCT ON (mengambilquiz.quiz) *
                      FROM mengambilquiz
                      JOIN kumpulansoalquiz ON mengambilquiz.quiz = kumpulansoalquiz.id
                      WHERE kumpulansoalquiz.id_materi = ordered_materi.id AND mengambilquiz.usernasho = $1
                      ORDER BY mengambilquiz.quiz, mengambilquiz.created_at DESC
                      LIMIT 1
                    ) AS subqueryquiz
                )
            )
        ORDER BY ordered_materi.tingkat ASC) AS Materi,
        (
            SELECT json_agg(
                json_build_object(
                    'id', ujian_phase.id,
                    'phase_ujian', ujian_phase.phase,
                    'kategori_ujian', ujian_phase.kategori_materi,
                    'riwayat', (
                        SELECT json_agg(
                            json_build_object(
                                'nilai', subqueryujian.nilai,
                                'lulus', subqueryujian.status
                            )
                        )
                        FROM (
                            SELECT DISTINCT ON (mengambilujian.ujian) mengambilujian.nilai, mengambilujian.status
                            FROM mengambilujian
                            WHERE mengambilujian.ujian = ujian_phase.id AND mengambilujian.usernasho = $1
                            ORDER BY mengambilujian.ujian, mengambilujian.created_at DESC
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
        SELECT DISTINCT ON (materi.id)
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
            materi.id, materi.tingkat ASC
    ) AS ordered_materi ON ordered_materi.phase = phase.id
    GROUP BY
        phase.id
    ORDER BY
        phase.id ASC;
    `;


    const { rows } = await pool.query(queryText, queryValues);


    if (!rows) {
      throw new CustomError(404, "Tidak Ada Materi Yang Ditemukan");
    }


    return rows
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetSpesificKategoriToDB(kategori) {
  try {
    const queryText = `SELECT * FROM kategorimateri WHERE id = $1`;

    const queryValues= [kategori]
    const result = await pool.query(queryText,queryValues);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "Tidak Ada Kategori Materi yang Ditemukan");
    }

    return result.rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetSpesificMateriToDB(data) {
  try {
    const { id, user_id } = data;
    const queryText = `
      SELECT materi.*, kategorimateri.jenis as subjudul,
        kumpulansoalquiz.id_materi AS id_quiz,
        CASE 
          WHEN COUNT(selected_quiz.id) = 0 THEN NULL
          ELSE json_agg(
            json_build_object(
              'id_mengambil_quiz', selected_quiz.id,
              'nilai', selected_quiz.nilai
            )
          )
        END AS history_quiz
      FROM materi
      LEFT JOIN kumpulansoalquiz ON materi.id = kumpulansoalquiz.id_materi
      LEFT JOIN LATERAL (
        SELECT id, nilai, created_at
        FROM mengambilquiz
        WHERE kumpulansoalquiz.id = mengambilquiz.quiz AND mengambilquiz.usernasho = $2
        ORDER BY nilai DESC, created_at DESC
        LIMIT 1
      ) selected_quiz ON true
      JOIN kategorimateri ON materi.kategori = kategorimateri.id
      WHERE materi.id = $1
      GROUP BY materi.id, kumpulansoalquiz.id_materi,kategorimateri.id;
`;
    const queryValues = [id, user_id];

    

    const { rows } = await pool.query(queryText, queryValues);


    if (!rows) {
      throw new CustomError(404, "Tidak Ada Materi Yang Ditemukan");
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
      throw new CustomError(500, "Gagal Menambahkan Akses Materi User");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { addMateriToDB, getAllKategoriMateri, GetAllMateriToDB, GetSpesificMateriToDB, AddNewMateriAccessToDB, UpdateMateriToDB, DeleteMateriToDB,GetSpesificKategoriToDB };
