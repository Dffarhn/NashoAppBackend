const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");

async function GetUjianByPhaseToDB(data) {
  try {
    const { phase, kategori_materi } = data;

    console.log(data);

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
                kumpulansoalujian.phase = $1 AND kumpulansoalujian.kategori_materi = $2
            GROUP BY 
                soal.id, soal.soal
            ORDER BY 
				RANDOM()
            LIMIT 20
        
        
        `;
    const queryValues = [phase, kategori_materi];

    const { rows } = await pool.query(queryText, queryValues);

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function AddTakeUjianUserToDB(data) {
  try {
    const { kategori_materi,phase, id_user } = data;

    const queryTextKS = `
                SELECT 
                    kumpulansoalujian.id 
                FROM 
                    kumpulansoalujian
                WHERE 
                    kumpulansoalujian.phase = $1 AND kumpulansoalujian.kategori_materi = $2
          `;
    const queryValuesKS = [phase, kategori_materi];

    const KumpulanSoalDB = await pool.query(queryTextKS, queryValuesKS);

    const queryText = `
          INSERT INTO public.mengambilujian(
              usernasho, ujian)
              VALUES ($1, $2)
              RETURNING id;
          `;

    const queryValues = [id_user, KumpulanSoalDB.rows[0].id]; // Correct order of parameters

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

      if (Math.ceil(points) > 75) {
        status = 'lulus'

      }

      const queryTextAddNilai = `
        UPDATE public.mengambilujian
        SET nilai=$1, status=$2
        WHERE id=$3;
      `

      const queryValuesAddNilai = [Math.ceil(points),status,id_mengambil_ujian]

      const AddNilaiToDB = await pool.query(queryTextAddNilai,queryValuesAddNilai)

      const payload = {
        nilai: Math.ceil(points),
        status: status
      }
  
      return payload;
    } catch (error) {
      handleCustomErrorModel(error);
    }
  }

module.exports = { GetUjianByPhaseToDB, AddTakeUjianUserToDB,GetNilaiUjianToDB };
