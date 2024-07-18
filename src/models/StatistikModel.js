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

    const progressList = rows.map(row => {
      let progress;
      if (row.quiz_status === 'lulus') {
        progress = 100;
      } else if (row.quiz_status === 'tidak lulus') {
        progress = 66;
      } else {
        progress = 33;
      }
      return { ...row, progress };
    });

    let targetMateri = progressList.find(row => row.progress < 100);

    if (!targetMateri && progressList.length > 0) {
      // If all progress is 100, take the last item
      targetMateri = progressList[progressList.length - 1];
      let nextMateriParams = {
        tingkat: targetMateri.tingkat_materi,
        phase: targetMateri.phase_materi,
        kategori: targetMateri.kategori_materi,
      };

      targetMateri = await SearchNextMateri(nextMateriParams);
    }

    const payload = {
        materi_id : targetMateri.materi_id,
        progress : targetMateri.progress
    }

    return payload;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function SearchNextMateri(data) {
  try {
    const { tingkat, phase, kategori } = data;

    const queryText = `
      SELECT id as materi_id
      FROM materi
      WHERE tingkat = $1 AND phase = $2 AND kategori = $3
    `;

    const queryValues = [tingkat + 1, phase, kategori];

    const { rows: nextMateriRows } = await pool.query(queryText, queryValues);

    if (nextMateriRows.length === 0) {
      const queryTextUjian = `
        SELECT  FROM kumpulansoalujian
        WHERE phase = $1 AND kategori_materi = $2
      `;
      const queryValuesUjian = [phase, kategori];

      const { rows: searchUjianRows } = await pool.query(queryTextUjian, queryValuesUjian);
      return searchUjianRows[0];
    }
    nextMateriRows[0].progress = 0
    return nextMateriRows[0];
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { GetStatistikUserToDB };
