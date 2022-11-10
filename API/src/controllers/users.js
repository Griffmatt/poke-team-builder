const pool = require("../db")
const queries = require('../queries/users')

const getUser= (req, res) => {
    const userId = parseInt(req.params.userId)
    pool.query(queries.getUser, [userId],
        (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}


module.exports = {
    getUser
}