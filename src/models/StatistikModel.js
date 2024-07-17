const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");

async function GetStatistikUserToDB(userId) {
    try {
        const queryText = ``

        const queryValues = [userId]

        const {rows} = await pool.query(queryText,queryValues)
        
        return rows
    } catch (error) {
        handleCustomErrorModel(error)
    }
    
}

module.exports = {GetStatistikUserToDB}