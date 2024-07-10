const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

//ADMIN
async function addMateriToDB(data) {
  try {
    const { judul, isi, linkVideo, kategori, phase } = data;
    const tanggalDibuat = new Date();

    const queryText = `
            INSERT INTO public.materi(
                phase, judul, isi, linkvideo, kategori, created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
    const queryValues = [phase, judul, isi, linkVideo, kategori, tanggalDibuat];

    const result = await pool.query(queryText, queryValues);

    if (!result.rows[0]) {
      throw new CustomError(500, "Failed to add materi to database");
    }

    return result.rows[0].id;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function UpdateMateriToDB(data,id) {
  try {
    
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
    let queryValues = [UserId,kategori];


    const queryText = `
    SELECT 
    materi.*, 
    mengambil_materi.id AS sudah_mengambil
    FROM 
        materi
    LEFT JOIN 
        mengambil_materi
    ON 
        materi.id = mengambil_materi.materi
    AND 
        mengambil_materi.usernasho = $1
    WHERE 
        kategori = $2`;
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
    const queryText = `SELECT * FROM materi WHERE id = $1`;
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

module.exports = { addMateriToDB, getAllKategoriMateri, GetAllMateriToDB, GetSpesificMateriToDB, AddNewMateriAccessToDB, UpdateMateriToDB, DeleteMateriToDB  };
