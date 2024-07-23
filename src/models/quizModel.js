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

    // Fetch the highest tingkat and phase the user has passed
    const queryTextMQ = `
      SELECT materi.tingkat, materi.phase
      FROM mengambilquiz
      LEFT JOIN kumpulansoalquiz ON kumpulansoalquiz.id = mengambilquiz.quiz
      LEFT JOIN materi ON kumpulansoalquiz.id_materi = materi.id
      WHERE mengambilquiz.usernasho = $1 AND mengambilquiz.status = 'lulus'
      ORDER BY materi.phase DESC, materi.tingkat DESC
      LIMIT 1
    `;

    const queryValuesMQ = [id_user];
    const usermaxujian = await pool.query(queryTextMQ, queryValuesMQ);

    let userMaxTingkat = { phase: 1, tingkat: 0 };

    if (usermaxujian.rows.length > 0) {
      userMaxTingkat = usermaxujian.rows[0];
    }

    // Fetch the tingkat and phase of the quiz being taken
    const queryTextQuizDiambil = `
      SELECT tingkat, phase, kategori
      FROM materi
      WHERE id = $1
    `;
    const queryValuesQuizDiambil = [id_materi];
    const QuizDiambil = await pool.query(queryTextQuizDiambil, queryValuesQuizDiambil);

    if (QuizDiambil.rows.length === 0) {
      throw new CustomError(404, "Materi not found");
    }

    const quizTingkat = QuizDiambil.rows[0].tingkat;
    const quizPhase = QuizDiambil.rows[0].phase;
    const quizKategori = QuizDiambil.rows[0].kategori;

    // Check if the user can access the quiz
    if (userMaxTingkat.phase > quizPhase) {
      return true; // User has passed a higher phase
    } else if (userMaxTingkat.phase === quizPhase) {
      return userMaxTingkat.tingkat >= quizTingkat - 1; // Check tingkat within the same phase
    } else if (userMaxTingkat.phase + 1 === quizPhase) {
      const maxTingkatInCurrentPhase = await maxTingkatInPhase(userMaxTingkat.phase, quizKategori);

      if (userMaxTingkat.tingkat === maxTingkatInCurrentPhase) {
        const queryCekUjianDone = `
          SELECT 1
          FROM kumpulansoalujian
          JOIN mengambilujian ON kumpulansoalujian.id = mengambilujian.ujian
          WHERE kumpulansoalujian.phase = $1 AND kumpulansoalujian.kategori_materi = $2 
            AND mengambilujian.usernasho = $3 AND mengambilujian.status = 'lulus'
          ORDER BY mengambilujian.created_at DESC
          LIMIT 1
        `;

        const queryValuesCekUjianDone = [userMaxTingkat.phase, quizKategori, id_user];
        const CekPreviousUjianPhaseDone = await pool.query(queryCekUjianDone, queryValuesCekUjianDone);

        if (CekPreviousUjianPhaseDone.rows.length > 0) {
          return quizTingkat === 1; // Check for the first tingkat of the next phase
        }
      }
    }

    return false;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

// Function to fetch the maximum tingkat within a phase for a given kategori
async function maxTingkatInPhase(phase, kategori_materi) {
  const queryText = `
    SELECT MAX(tingkat) AS max_tingkat
    FROM materi
    WHERE phase = $1 AND kategori = $2
  `;
  const queryValues = [phase, kategori_materi];
  const result = await pool.query(queryText, queryValues);

  if (result.rows.length > 0) {
    return result.rows[0].max_tingkat;
  }
  return 1; // Default to 1 if no data found
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

    const payload = [{
      nilai: Math.ceil(points),
      lulus: status_kelulusan,
      jumlah_soal : totalQuestions,
      jumlah_benar : trueCount,
      jumlah_salah : totalQuestions - trueCount

    }];

    return payload;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { GetAllQuizMateriToDB, AddTakeQuizUserToDB, GetNilaiQuizToDB };
