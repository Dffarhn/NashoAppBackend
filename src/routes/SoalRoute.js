const { handleCustomErrorRoute } = require("../function/ErrorFunction")
const { AddSoalToMateriToDB } = require("../models/soalModel")
const CustomError = require("../utils/customError")

const AddSoalQuiz = async (req,res) =>{
    try {
        const data = req.body
        const {id_materi} = req.params

        data.id_materi = id_materi

        const AddSoalQuizData = await AddSoalToMateriToDB(data,"quiz")


        if (!AddSoalQuizData) {
            throw new CustomError(500,"Failed To Call Database","Ulangi")
        }

        res.status(201).json({msg:"Soal Added To Database"})
        
    } catch (error) {
        handleCustomErrorRoute(res,error)
    }
}
const AddSoalUjian = async (req,res) =>{
    try {
        const data = req.body
        const {id_materi} = req.params

        data.id_materi = id_materi

        const AddSoalUjianData = await AddSoalToMateriToDB(data,"ujian")


        if (!AddSoalUjianData) {
            throw new CustomError(500,"Failed To Call Database","Ulangi")
        }

        res.status(201).json({msg:"Soal Added To Database"})
        
    } catch (error) {
        handleCustomErrorRoute(res,error)
    }
}

module.exports = {AddSoalQuiz,AddSoalUjian}