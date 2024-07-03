const { handleCustomErrorRoute } = require("../function/ErrorFunction")
const { AddSoalToMateriToDB } = require("../models/soalModel")

const AddSoalQuiz = async (req,res) =>{
    try {
        const data = req.body
        const {id_materi} = req.params

        data.id_materi = id_materi

        const AddSoalQuizData = await AddSoalToMateriToDB(data,"soal")
        
    } catch (error) {
        handleCustomErrorRoute(res,error)
    }
}