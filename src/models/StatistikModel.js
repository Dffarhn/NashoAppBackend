const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");

async function GetStatistikUserToDB(userId) {
  try {
    const queryText = `
      WITH latest_quiz AS (
        SELECT DISTINCT ON (kumpulansoalquiz.id_materi)
          kumpulansoalquiz.id_materi,
          mengambilquiz.status
        FROM kumpulansoalquiz
        LEFT JOIN mengambilquiz ON kumpulansoalquiz.id = mengambilquiz.quiz AND mengambilquiz.usernasho = $1
        ORDER BY kumpulansoalquiz.id_materi, mengambilquiz.created_at DESC
      )
      SELECT 
        mengambil_materi.materi AS materi_id,
        materi.tingkat AS tingkat_materi, 
        materi.phase AS phase_materi, 
        materi.kategori AS kategori_materi,
        latest_quiz.status AS quiz_status
      FROM mengambil_materi
      JOIN kumpulansoalquiz ON kumpulansoalquiz.id_materi = mengambil_materi.materi
      JOIN materi ON materi.id = mengambil_materi.materi
      LEFT JOIN latest_quiz ON mengambil_materi.materi = latest_quiz.id_materi
      WHERE mengambil_materi.usernasho = $1
      ORDER BY mengambil_materi.created_at ASC
    `;

    const queryValues = [userId];
    const { rows } = await pool.query(queryText, queryValues);

    const progressList = rows.map((row) => {
      let progress;
      if (row.quiz_status === "lulus") {
        progress = 100;
      } else if (row.quiz_status === "tidak lulus") {
        progress = 66;
      } else {
        progress = 33;
      }
      return { ...row, progress };
    });

    let targetMateri = progressList.find((row) => row.progress < 100);

    if (!targetMateri && progressList.length > 0) {
      // If all progress is 100, take the last item
      targetMateri = progressList[progressList.length - 1];
      let nextMateriParams = {
        userId: userId,
        tingkat: targetMateri.tingkat_materi,
        phase: targetMateri.phase_materi,
        kategori: targetMateri.kategori_materi,
      };

      targetMateri = await SearchNextMateri(nextMateriParams);
      if (!targetMateri.ujian_id) {
        targetMateri.IsMateri = true
      }
    }

    const payload = {
      progress: targetMateri.progress,
    };

    // Check if the targetMateri has ujian_id and include it in the payload
    if (targetMateri.ujian_id) {
      payload.ujian_id = targetMateri.ujian_id;
      payload.phase = targetMateri.phase;
      payload.kategori = targetMateri.kategori;
      payload.IsUjian = true;
      payload.IsMateri = false;
      payload.IsQuiz = false;
    } else if(targetMateri.IsMateri){
      payload.materi_id = targetMateri.materi_id;
      payload.IsMateri = true;
      payload.IsUjian = false;
      payload.IsQuiz = false;
    }else{
      payload.quiz_materi_id = targetMateri.materi_id
      payload.IsMateri = false;
      payload.IsUjian = false;
      payload.IsQuiz = true;
    }

    return payload;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function SearchNextMateri(data) {
  try {
    const { tingkat, phase, kategori, userId } = data;

    const queryText = `
      SELECT id as materi_id
      FROM materi
      WHERE tingkat = $1 AND phase = $2 AND kategori = $3
    `;

    const queryValues = [tingkat + 1, phase, kategori];

    const { rows: nextMateriRows } = await pool.query(queryText, queryValues);

    if (nextMateriRows.length === 0) {
      const QueryTextCheckUjian = `
      SELECT mengambilujian.id
      FROM mengambilujian
      LEFT JOIN kumpulansoalujian ON mengambilujian.ujian = kumpulansoalujian.id
      WHERE kumpulansoalujian.phase = $1 AND kumpulansoalujian.kategori_materi = $2 AND mengambilujian.status = 'lulus' AND mengambilujian.usernasho = $3
      ORDER BY mengambilujian.created_at DESC, mengambilujian.nilai DESC
      LIMIT 1

      `;

      const QueryValuesCheckUjian = [phase, kategori, userId];

      const { rows: CheckUjian } = await pool.query(QueryTextCheckUjian, QueryValuesCheckUjian);

      console.log(CheckUjian);

      if (CheckUjian.length == 0) {
        const queryTextUjian = `
          SELECT  id AS ujian_id FROM kumpulansoalujian
          WHERE phase = $1 AND kategori_materi = $2
        `;
        const queryValuesUjian = [phase, kategori];

        const { rows: searchUjianRows } = await pool.query(queryTextUjian, queryValuesUjian);
        searchUjianRows[0].progress = 0;
        searchUjianRows[0].phase = phase;
        searchUjianRows[0].kategori = kategori;
        return searchUjianRows[0];
      }

      const QueryTextNextMateriIsPhase = `
        SELECT id as materi_id
        FROM materi
        WHERE tingkat = $1 AND phase = $2 AND kategori = $3
        
      `;
      const queryValuesNextMateriIsPhase = [1, phase + 1, kategori];

      const { rows: NextMateriIsPhase } = await pool.query(QueryTextNextMateriIsPhase, queryValuesNextMateriIsPhase);
      NextMateriIsPhase[0].progress = 0;
      return NextMateriIsPhase[0];
    }
    nextMateriRows[0].progress = 0;
    return nextMateriRows[0];
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { GetStatistikUserToDB };
