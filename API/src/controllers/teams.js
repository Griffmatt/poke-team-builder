const pool = require("../db")
const queries = require('../queries/teams')

const getAllUsersTeams= (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getAllUsersTeams, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getTeam = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getTeam, id, (error, results) => {
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getAllUsersTeams,
    getTeam
}