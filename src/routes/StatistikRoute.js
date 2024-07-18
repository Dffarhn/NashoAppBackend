const { handleCustomErrorRoute } = require("../function/ErrorFunction")
const { GetStatistikUserToDB } = require("../models/StatistikModel")
const CustomError = require("../utils/customError")

const GetStatistikUserRoute = async (req,res) =>{

    try {
        const userId = req.user.id
        
        const GetStatistikUserData = await GetStatistikUserToDB(userId)

        if (!GetStatistikUserData) {
            throw new CustomError(404,"tidak ada statistik")
        }

        res.status(200).json({msg:"Query Sukses", data: [GetStatistikUserData]})

        
    } catch (error) {
        handleCustomErrorRoute(res,error)
    }

}


module.exports = {GetStatistikUserRoute}