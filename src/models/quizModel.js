const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function GetAllQuizMateriToDB(id_materi) {
  try {
    const queryValues = [id_materi];

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
            materi
        JOIN 
            kumpulansoalquiz ON kumpulansoalquiz.id_materi = materi.id
        JOIN 
            soal ON kumpulansoalquiz.id = soal.id_kumpulan_soal
        JOIN 
            pilihansoal ON soal.pilihan_jawaban = pilihansoal.id_soal
        JOIN 
            jawabansoal ON pilihansoal.id_jawaban = jawabansoal.id
        WHERE 
            kumpulansoalquiz.id_materi = $1
        GROUP BY 
            soal.id, soal.soal;

        `;

    const { rows } = await pool.query(queryText, queryValues);

    if (!rows) {
      throw new CustomError(500, "Failed To Call Database");
    }

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function CheckTheTakenQuiz(data) {
  try {
    const { id_materi, id_user } = data;

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
    console.log(usermaxujian.rows.length)

    if (usermaxujian.rows.length > 0) {
      console.log("masuk")
      userMaxTingkat = usermaxujian.rows[0];
    }

    console.log(userMaxTingkat)

    const queryTextQuizDiambil = `
      SELECT tingkat, phase
      FROM materi
      WHERE id = $1
    `;
    const queryValuesQuizDiambil = [id_materi];
    const QuizDiambil = await pool.query(queryTextQuizDiambil, queryValuesQuizDiambil);

    console.log(QuizDiambil.rows)

    if (userMaxTingkat.phase >= QuizDiambil.rows[0].phase-1) {
      return userMaxTingkat.tingkat >= QuizDiambil.rows[0].tingkat-1;
    } else {
      return false;
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function AddTakeQuizUserToDB(data) {
  try {
    const { id_materi, id_user } = data;

    const queryTextKS = `
      SELECT id FROM kumpulansoalquiz WHERE id_materi = $1;
    `;
    const queryValuesKS = [id_materi];
    const KumpulanSoalDB = await pool.query(queryTextKS, queryValuesKS);

    if (KumpulanSoalDB.rows.length === 0) {
      throw new CustomError(404, "Quiz not found for the given materi");
    }

    const isQuizAvailable = await CheckTheTakenQuiz(data);

    if (!isQuizAvailable) {
      throw new CustomError(401, "Get The Previously Quiz First");
    }

    const queryText = `
      INSERT INTO public.mengambilquiz(usernasho, quiz)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const queryValues = [id_user, KumpulanSoalDB.rows[0].id];

    const { rows } = await pool.query(queryText, queryValues);
    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetNilaiQuizToDB(data) {
  try {
    const { id_mengambil_quiz, id_user } = data;

    console.log(id_mengambil_quiz, id_user);

    const queryText = `
        SELECT  
            jawabanquizuser.status_jawaban
        FROM 
            mengambilquiz
        JOIN 
            jawabanquizuser ON jawabanquizuser.quiz_diambil = mengambilquiz.id
        WHERE
            mengambilquiz.usernasho = $1
            AND jawabanquizuser.quiz_diambil = $2;


        `;

    const queryValues = [id_user, id_mengambil_quiz];

    const { rows } = await pool.query(queryText, queryValues);

    // Count the number of true answers
    const trueCount = rows.filter((item) => item.status_jawaban === true).length;

    // Calculate the points
    const totalQuestions = rows.length;
    const maxPoints = 100;
    const points = (trueCount / totalQuestions) * maxPoints;

    let status = "tidak lulus";

    if (Math.ceil(points) > 70) {
      status = "lulus";
    }

    const queryTextAddNilai = `
      UPDATE public.mengambilquiz
      SET nilai=$1, status=$2
      WHERE id=$3;
    `;

    const queryValuesAddNilai = [Math.ceil(points), status, id_mengambil_quiz];

    const AddNilaiToDB = await pool.query(queryTextAddNilai, queryValuesAddNilai);
    let status_kelulusan = false;
    if (status == "lulus") {
      status_kelulusan = true;
    }

    const payload = {
      nilai: Math.ceil(points),
      lulus: status_kelulusan,
    };

    return payload;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { GetAllQuizMateriToDB, AddTakeQuizUserToDB, GetNilaiQuizToDB };
