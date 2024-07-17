const { handleCustomErrorRoute } = require("../function/ErrorFunction")
const { GetStatistikUserToDB } = require("../models/StatistikModel")

const GetStatistikUserRoute = async (req,res) =>{

    try {
        const userId = req.user.id

        const GetStatistikUserData = await GetStatistikUserToDB(userId)
        
        
    } catch (error) {
        handleCustomErrorRoute(res,error)
    }

}


module.exports = {GetStatistikUserRoute}