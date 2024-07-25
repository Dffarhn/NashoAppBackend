const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const CustomError = require("../utils/customError");

async function GetPembahasanUjianToDB(data) {
    try {
        const { id_mengambil_ujian, id_user } = data;

        const queryText = `
            SELECT 
                jawabanujianuser.soal_ujian,
                soal.soal,
                json_agg(
                    json_build_object(
                        'jawaban_user_id', jawabanujianuser.jawaban_user,
                        'jawaban_user', js.jawaban,
                        'jawaban_benar', jb.jawaban
                    )
                ) AS jawaban_details,
                jawabanujianuser.status_jawaban AS Benar,
                soal.pembahasan
            FROM mengambilujian
            JOIN jawabanujianuser ON mengambilujian.id = jawabanujianuser.ujian_diambil
            JOIN soal ON jawabanujianuser.soal_ujian = soal.id
            JOIN jawabansoal js ON jawabanujianuser.jawaban_user = js.id
            JOIN jawabansoal jb ON soal.jawaban_benar = jb.id
            WHERE mengambilujian.usernasho = $2 AND mengambilujian.id = $1
            GROUP BY jawabanujianuser.soal_ujian, soal.soal,jawabanujianuser.status_jawaban,soal.pembahasan;
        `;

        const queryValues = [id_mengambil_ujian, id_user];

        const { rows } = await pool.query(queryText, queryValues);

        if (!rows) {
            throw new CustomError(500, "Failed to call Database");
        }
        return rows;
        
    } catch (error) {
        handleCustomErrorModel(error);
    }
}

async function GetPembahasanQuizToDB(data) {
    try {
        const {id_mengambil_quiz, id_user} = data
        const queryText = `
        
       SELECT 
            jawabanquizuser.soal_quiz,
            soal.soal,
            json_agg(
                json_build_object(
                    'jawaban_user_id', jawabanquizuser.jawaban_user,
                    'jawaban_user', js.jawaban,
                    'jawaban_benar', jb.jawaban
                )
            ) AS jawaban_details,
            jawabanquizuser.status_jawaban AS Benar,
            soal.pembahasan
        FROM mengambilquiz
        JOIN jawabanquizuser ON mengambilquiz.id = jawabanquizuser.quiz_diambil
        JOIN soal ON jawabanquizuser.soal_quiz = soal.id
        JOIN jawabansoal js ON jawabanquizuser.jawaban_user = js.id
        JOIN jawabansoal jb ON soal.jawaban_benar = jb.id
        WHERE mengambilquiz.usernasho = $2 AND mengambilquiz.id = $1
        GROUP BY jawabanquizuser.soal_quiz, soal.soal, jawabanquizuser.status_jawaban, soal.pembahasan;


        `

        const queryValues = [id_mengambil_quiz,id_user]

        const {rows} = await pool.query(queryText,queryValues)

        if (!rows) {
            throw new CustomError(500,"Failed to call Database")
        }
        return rows
        
    } catch (error) {
        handleCustomErrorModel(error)
    }
    
}

module.exports = {GetPembahasanQuizToDB,GetPembahasanUjianToDB}