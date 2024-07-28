const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function GetUjianByPhaseAdminToDB(id) {
  try {

    const queryText = `
            SELECT 
            soal.id AS soal_id,
            soal.soal,
            json_agg(
                json_build_object(
                    'id', jawabansoal.id, 
                    'jawaban', jawabansoal.jawaban
                )
            ) AS pilihan,
            soal.jawaban_benar AS jawaban_benar
            FROM
                kumpulansoalujian
            JOIN 
                soal ON kumpulansoalujian.id = soal.id_kumpulan_soal
            JOIN 
                pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
            JOIN 
                jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
            WHERE 
                kumpulansoalujian.id = $1
            GROUP BY 
                soal.id, soal.soal
            ORDER BY 
				RANDOM()
            LIMIT 20
        
        
        `;
    const queryValues = [id];

    const { rows } = await pool.query(queryText, queryValues);

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}
async function GetUjianByPhaseToDB(id) {
  try {

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
                kumpulansoalujian
            JOIN 
                soal ON kumpulansoalujian.id = soal.id_kumpulan_soal
            JOIN 
                pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
            JOIN 
                jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
            WHERE 
                kumpulansoalujian.id = $1
            GROUP BY 
                soal.id, soal.soal
            ORDER BY 
				RANDOM()
            LIMIT 20
        
        
        `;
    const queryValues = [id];

    const { rows } = await pool.query(queryText, queryValues);

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function CheckTheTakenUjian(data) {
  try {
    const { phase,kategori_materi, id_user } = data;

    const queryTextMQ = `
      SELECT materi.tingkat, materi.phase
      FROM mengambilquiz
      LEFT JOIN kumpulansoalquiz ON kumpulansoalquiz.id = mengambilquiz.quiz
      LEFT JOIN materi ON kumpulansoalquiz.id_materi = materi.id
      WHERE mengambilquiz.usernasho = $1 AND mengambilquiz.status = 'lulus'
      ORDER BY mengambilquiz.created_at DESC, materi.tingkat ASC
      LIMIT 1
    `;

    const queryValuesMQ = [id_user];
    const usermaxujian = await pool.query(queryTextMQ, queryValuesMQ);

    let userMaxTingkat = { phase: 1, tingkat: 1 };

    if (usermaxujian.rows.length > 0) {
      userMaxTingkat = usermaxujian.rows[0];
    }

    const queryTextQuizDiambil = `
      SELECT MAX(tingkat) AS max_tingkat, phase
      FROM materi
      WHERE phase = $1 AND kategori = $2
      GROUP BY phase;

    `;
    const queryValuesQuizDiambil = [phase,kategori_materi];
    const QuizDiambil = await pool.query(queryTextQuizDiambil, queryValuesQuizDiambil);

    if (userMaxTingkat.phase >= QuizDiambil.rows[0].phase) {
      return userMaxTingkat.tingkat >= QuizDiambil.rows[0].max_tingkat;
    } else {
      return false;
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function AddTakeUjianUserToDB(data) {
  try {
    const { id, id_user } = data;
    const check = await CheckTheTakenUjian(data); // Await the promise

    if (!check) {
      throw new CustomError(401, "Anda Tidak Diperbolehkan Mengambil Ujian ini");
    }
    const queryText = `
          INSERT INTO public.mengambilujian(
              usernasho, ujian)
              VALUES ($1, $2)
              RETURNING id;
          `;

    const queryValues = [id_user, id]; // Correct order of parameters

    const { rows } = await pool.query(queryText, queryValues);
    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetNilaiUjianToDB(data) {
    try {
      const { id_mengambil_ujian, id_user } = data;
  
  
      const queryText = `
          SELECT  
              jawabanujianuser.status_jawaban
          FROM 
              mengambilujian
          JOIN 
              jawabanujianuser ON jawabanujianuser.ujian_diambil = mengambilujian.id
          WHERE
              mengambilujian.usernasho = $1
              AND jawabanujianuser.ujian_diambil = $2;
          `;
  
      const queryValues = [id_user, id_mengambil_ujian];
  
      const { rows } = await pool.query(queryText, queryValues);
  
      // Count the number of true answers
      const trueCount = rows.filter((item) => item.status_jawaban === true).length;
  
      // Calculate the points
      const totalQuestions = rows.length;
      const maxPoints = 100;
      const points = (trueCount / totalQuestions) * maxPoints;

      let status = 'tidak lulus'

      if (Math.ceil(points) > 70) {
        status = 'lulus'

      }

      const queryTextAddNilai = `
        UPDATE public.mengambilujian
        SET nilai=$1, status=$2
        WHERE id=$3;
      `

      const queryValuesAddNilai = [Math.ceil(points),status,id_mengambil_ujian]

      const AddNilaiToDB = await pool.query(queryTextAddNilai,queryValuesAddNilai)

      let status_kelulusan = false;
      if (status == "lulus") {
        status_kelulusan = true;
      }
  

      const payload = [{
        nilai: Math.ceil(points),
        lulus: status_kelulusan,
        jumlah_soal : totalQuestions,
        jumlah_benar : trueCount,
        jumlah_salah : totalQuestions - trueCount
      }]
  
      return payload;
    } catch (error) {
      handleCustomErrorModel(error);
    }
  }

module.exports = { GetUjianByPhaseToDB, AddTakeUjianUserToDB,GetNilaiUjianToDB,GetUjianByPhaseAdminToDB };
