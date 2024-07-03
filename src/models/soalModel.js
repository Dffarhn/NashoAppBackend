const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");

async function AddSoalToMateriToDB(data, tipe) {
  try {
    const { soal, jawaban_benar, pilihan, id_materi } = data;
    let kumpulan_soal = null;
    if (tipe == "ujian") {

      const kategori_soal = "dc2e83a4-418d-48a6-b50f-0a487db6252a";
      const queryValuesKS = [id_materi, kategori_soal];
      const queryTextKS = `

        INSERT INTO kumpulan_soal(id_materi,kategori_soal)
        VALUES ($1,$2)
        RETURNING id;
        `;

        const {rows} = pool.query(queryValuesKS,queryTextKS)
        


    } else {
    }

    const queryTextJawaban = `
    INSERT INTO jawaban (pilihan)
    VALUES ${values}
    RETURNING id_jawaban;
  `;
    const queryValuesJawaban = pilihan;
    const resultJawaban = await client.query(queryTextJawaban, queryValuesJawaban);
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { AddSoalToMateriToDB };
